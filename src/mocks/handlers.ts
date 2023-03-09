import { rest } from "msw";
import { token } from "../testsUtils/data";

const handlers = [
  rest.post(
    `${process.env.REACT_APP_API_URL!}/user/login`,
    async (req, res, ctx) =>
      res(
        ctx.status(201),
        ctx.json({
          token,
        })
      )
  ),
];

export default handlers;
