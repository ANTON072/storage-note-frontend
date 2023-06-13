import { rest } from "msw";

import { MOCK_API_BASE_URL } from "@/domain/application";

export const userHandlers = [
  rest.get(`${MOCK_API_BASE_URL}/v1/users`, (_req, res, ctx) => {
    // const isAuthenticated = sessionStorage.getItem("is-authenticated");
    // if (!isAuthenticated) {
    //   // If not authenticated, respond with a 403 error
    //   return res(
    //     ctx.status(403),
    //     ctx.json({
    //       errorMessage: "Not authorized",
    //     })
    //   );
    // }
    // 認証切れidTokenの場合のテスト
    return res(
      ctx.status(401),
      ctx.json({
        title: "token has expired",
      })
    );

    // If authenticated, return a mocked user details
    // return res(
    //   ctx.status(200),
    //   ctx.json({
    //     username: "admin",
    //   })
    // );
  }),
];
