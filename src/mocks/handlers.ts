import { rest } from "msw";
import { token } from "../testsUtils/data";
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
            token,
          })
        );
      }

      return res(ctx.status(400));
    }
  ),
];

export default handlers;
