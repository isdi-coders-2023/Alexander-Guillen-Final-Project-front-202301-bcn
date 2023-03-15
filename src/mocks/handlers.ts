import { rest } from "msw";
import { flashcards, mockToken } from "../testsUtils/data";
import { type UserCredentials } from "../types";

const handlers = [
  rest.post(
    `${process.env.REACT_APP_API_URL!}/user/login`,
    async (req, res, ctx) => {
      const { username, password } = await req.json<UserCredentials>();

      if (username === "Alexander" && password === "j4lkLZ6PJI7W4d3") {
        return res(
          ctx.status(201),
          ctx.json({
            token: mockToken,
          })
        );
      }

      return res(ctx.status(400));
    }
  ),
  rest.get(
    `${process.env.REACT_APP_API_URL!}/flashcards`,
    async (req, res, ctx) => {
      const authorizationHeader = req.headers.get("authorization");

      if (authorizationHeader === `Bearer ${mockToken}`) {
        return res(ctx.status(200), ctx.json({ flashcards }));
      }

      return res(ctx.status(403));
    }
  ),
];

export default handlers;
