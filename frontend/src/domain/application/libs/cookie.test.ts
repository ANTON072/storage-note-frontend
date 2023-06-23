import { getCookie, setCookie } from "./cookie";

describe("cookie", () => {
  let cookieBackup: string;

  beforeEach(() => {
    // Save current cookie before each test
    cookieBackup = document.cookie;
  });

  afterEach(() => {
    // Restore original cookie after each test
    document.cookie = cookieBackup;
  });

  test("cookieから値を取得する", () => {
    document.cookie = "foo=bar;bar=foo";
    expect(getCookie("foo")).toBe("bar");
  });

  test("cookieに値がない場合はundefinedを返す", () => {
    expect(getCookie("boo")).toBeUndefined();
  });

  test("cookieに値をセットする", () => {
    setCookie("foo", "Hello World");
    const cookieFoo = getCookie("foo");
    expect(cookieFoo).toBe("Hello World");
  });

  test("cookieに複数の値をセットする", () => {
    setCookie("foo", "Hello World");
    setCookie("bar", "Hello Tokyo");
    setCookie("baz", "Hello NewYork");
    const cookieFoo = getCookie("foo");
    const cookieBar = getCookie("bar");
    const cookieBaz = getCookie("baz");
    expect(cookieFoo).toBe("Hello World");
    expect(cookieBar).toBe("Hello Tokyo");
    expect(cookieBaz).toBe("Hello NewYork");
  });
});
