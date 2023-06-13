import { rest } from "msw";

import { MOCK_API_BASE_URL } from "@/domain/application";

export const handlers = [
  rest.post(`${MOCK_API_BASE_URL}/login`, (_req, res, ctx) => {
    sessionStorage.setItem("is-authenticated", "true");

    return res(ctx.status(200));
  }),
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

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
];
