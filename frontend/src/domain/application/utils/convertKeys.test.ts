import {
  camelcase,
  camelcaseKeys,
  snakecase,
  snakecaseKeys,
} from "./convertKeys";

describe("camelcaseKeys", () => {
  test("アンダースコアをキャメルケースに変換する", () => {
    expect(camelcase("foo_bar")).toBe("fooBar");
  });

  test("複数アンダースコアがあっても変換する", () => {
    expect(camelcase("foo_bar_foo_bar")).toBe("fooBarFooBar");
  });

  test("オブジェクトをキャメルケースに変換する", () => {
    const obj = {
      foo_bar: "fooBar",
    };
    expect(camelcaseKeys(obj)).toEqual({ fooBar: "fooBar" });
  });

  test("入れ子オブジェクトをキャメルケースに変換する", () => {
    const obj = {
      foo_bar: {
        bar_foo: {
          foo_bar: 123,
        },
      },
    };
    expect(camelcaseKeys(obj)).toEqual({
      fooBar: {
        barFoo: {
          fooBar: 123,
        },
      },
    });
  });

  test("値に配列があっても変換する", () => {
    const obj = {
      foo_bar: {
        bar_foo: {
          foo_bar: [1, 2, 3, 4, 5],
        },
      },
    };
    expect(camelcaseKeys(obj)).toEqual({
      fooBar: {
        barFoo: {
          fooBar: [1, 2, 3, 4, 5],
        },
      },
    });
  });
});

describe("snakecase", () => {
  test("キャメルケースをアンダースコアに変換する", () => {
    expect(snakecase("fooBar")).toBe("foo_bar");
  });

  test("オブジェクトをキャメルケースに変換する", () => {
    const obj = {
      fooBar: {
        barFoo: {
          fooBar: [1, 2, 3, 4, 5],
        },
      },
    };
    expect(snakecaseKeys(obj)).toEqual({
      foo_bar: {
        bar_foo: {
          foo_bar: [1, 2, 3, 4, 5],
        },
      },
    });
  });
});
