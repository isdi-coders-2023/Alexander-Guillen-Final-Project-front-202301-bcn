import { rest } from "msw";
import { flashcards, mockFlashcard, mockToken } from "../testsUtils/data";
import {
  type Flashcard,
  type RequestParams,
  type UserCredentials,
} from "../types";

const apiUrl = process.env.REACT_APP_API_URL!;

const handlers = [
  rest.post(`${apiUrl}/user/login`, async (req, res, ctx) => {
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
  }),
  rest.get(`${apiUrl}/flashcards`, async (req, res, ctx) => {
    const authorizationHeader = req.headers.get("authorization");

    if (authorizationHeader === `Bearer ${mockToken}`) {
      return res(ctx.status(200), ctx.json({ flashcards }));
    }

    return res(ctx.status(403));
  }),
  rest.delete<Record<string, unknown>, RequestParams>(
    `${apiUrl}/flashcards/:userId`,
    async (req, res, ctx) => {
      const { userId } = req.params;

      if (flashcards.some(({ id }) => id === userId)) {
        return res(ctx.status(200));
      }

      return res(ctx.status(500));
    }
  ),
  rest.post(`${apiUrl}/flashcards`, async (req, res, ctx) => {
    const flashcard = await req.json<Flashcard>();
    const hasFilledValues = Object.values(flashcard).every(
      (value) => value.length > 0
    );

    const authorizationHeader = req.headers.get("authorization");

    if (authorizationHeader === `Bearer ${mockToken}` && hasFilledValues) {
      return res(
        ctx.status(201),
        ctx.json({
          flashcard: { ...mockFlashcard, id: "641129f79f3cfb43b4418b1e" },
        })
      );
    }

    return res(ctx.status(500));
  }),
];

export default handlers;
