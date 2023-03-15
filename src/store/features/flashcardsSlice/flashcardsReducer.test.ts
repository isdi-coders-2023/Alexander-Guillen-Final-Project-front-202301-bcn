import { flashcards } from "../../../testsUtils/data";
import {
  loadFlashcardsActionCreator,
  flashcardsReducer,
} from "./flashcardsSlice";

describe("Given flashcardsReducer", () => {
  describe("When it is called with loadFlashcards action (which has been called with three flashcards)", () => {
    test("Then it should return new flashcards state with those three flashcards", () => {
      const loadFlashcardsAction = loadFlashcardsActionCreator(flashcards);

      const newFlashCardsState = flashcardsReducer([], loadFlashcardsAction);

      expect(newFlashCardsState).toStrictEqual(flashcards);
    });
  });
});
