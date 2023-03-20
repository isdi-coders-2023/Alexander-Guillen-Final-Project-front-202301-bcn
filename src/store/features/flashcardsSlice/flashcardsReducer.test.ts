import { flashcards } from "../../../testsUtils/data";
import { Flashcard } from "../../../types";
import {
  loadFlashcardsActionCreator,
  flashcardsReducer,
  deleteFlashcardActionCreator,
  createFlashcardActionCreator,
} from "./flashcardsSlice";

describe("Given flashcardsReducer", () => {
  describe("When it is called with loadFlashcards action (which has been called with three flashcards)", () => {
    test("Then it should return new flashcards state with those three flashcards", () => {
      const loadFlashcardsAction = loadFlashcardsActionCreator(flashcards);

      const newFlashCardsState = flashcardsReducer([], loadFlashcardsAction);

      expect(newFlashCardsState).toStrictEqual(flashcards);
    });
  });

  describe("When it is called with deleteFlashcard action (which has been called with id '641129f79f3cfb43b4418b1e'", () => {
    test("Then it should return new flashcards state without the flashcard containing that id", () => {
      const flashcardId = "641129f79f3cfb43b4418b1e";
      const deleteFlashcardAction = deleteFlashcardActionCreator(flashcardId);

      const newFlashcardsState = flashcardsReducer(
        flashcards,
        deleteFlashcardAction
      );

      expect(newFlashcardsState).toStrictEqual(flashcards.slice(1));
    });
  });

  describe("When it is called with createFlashcard action (which has been called with a flashcard)", () => {
    test("Then it should return new flashcards state with that flashcard", () => {
      const newFlashcard = flashcards[0];
      const createFlashcardAction = createFlashcardActionCreator(newFlashcard);

      const newFlashcardsState = flashcardsReducer([], createFlashcardAction);

      expect(newFlashcardsState).toStrictEqual([newFlashcard]);
    });
  });
});
