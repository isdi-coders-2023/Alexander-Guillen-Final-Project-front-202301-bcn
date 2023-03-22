import { setupStore, store } from "../../store/store";
import useFlashcards from "./useFlashcards";
import {
  deleteFlashcardModal,
  deleteFlashcardModalError,
  flashcardCreated,
  flashcardCreatedError,
  flashcards,
  mockFlashcard,
  mockToken,
} from "../../testsUtils/data";
import {
  openModalActionCreator,
  setLoadingActionCreator,
  unsetLoadingActionCreator,
} from "../../store/features/uiSlice/uiSlice";
import {
  createFlashcardActionCreator,
  deleteFlashcardActionCreator,
  loadFlashcardsActionCreator,
} from "../../store/features/flashcardsSlice/flashcardsSlice";
import { type Flashcard, type ModalPayload } from "../../types";
import { renderHookWithStore } from "../../testsUtils/renders";

describe("Given an useFlashcards hook", () => {
  const setLoadingAction = setLoadingActionCreator();
  const unsetLoadingAction = unsetLoadingActionCreator();

  describe("When loadFlashcards is called with token 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9s'", () => {
    test("Then it should call dispatch with setLoading, loadFlashcards and unsetLoading actions", async () => {
      const testStore = setupStore({
        user: {
          ...store.getState().user,
          token: mockToken,
        },
      });
      const loadFlashcardsAction = loadFlashcardsActionCreator(flashcards);
      const expectedCalledActions = [
        [setLoadingAction],
        [loadFlashcardsAction],
        [unsetLoadingAction],
      ];
      const dispatchSpy = jest.spyOn(testStore, "dispatch");

      await renderHookWithStore(useFlashcards, testStore, "loadFlashcards")();

      expect(dispatchSpy.mock.calls).toStrictEqual(expectedCalledActions);
    });
  });

  describe("When loadFlashcards is called with token 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4i'", () => {
    test("Then it should call dispatch with setLoading, unsetLoading and openModal (flashcardsError) actions", async () => {
      const flashcardsError: ModalPayload = {
        title: "Error!",
        message: "Couldn't load the flashcards. Refresh the page",
        isError: true,
      };
      const openModalAction = openModalActionCreator(flashcardsError);
      const testStore = setupStore({
        user: {
          ...store.getState().user,
          token: "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4i",
        },
      });
      const dispatchSpy = jest.spyOn(testStore, "dispatch");
      const expectedCalledActions = [
        [setLoadingAction],
        [unsetLoadingAction],
        [openModalAction],
      ];

      await renderHookWithStore(useFlashcards, testStore, "loadFlashcards")();

      expect(dispatchSpy.mock.calls).toStrictEqual(expectedCalledActions);
    });
  });

  describe("When deleteFlashcard receives id '641129f79f3cfb43b4418b1e'", () => {
    test("Then it should call dispatch with deleteFlashcard (with the given id), and openModal (with deleteFlashcardModal) actions", async () => {
      const mockFlashcards = flashcards;
      const id = "641129f79f3cfb43b4418b1e";
      const deleteFlashcardAction = deleteFlashcardActionCreator(id);
      const openModalAction = openModalActionCreator(deleteFlashcardModal);
      const expectedCalledActions = [
        [deleteFlashcardAction],
        [openModalAction],
      ];
      const testStore = setupStore({ flashcards: mockFlashcards });
      const dispatchSpy = jest.spyOn(testStore, "dispatch");

      await renderHookWithStore(
        useFlashcards,
        testStore,
        "deleteFlashcard"
      )(id);

      expect(dispatchSpy.mock.calls).toStrictEqual(expectedCalledActions);
    });
  });

  describe("When deleteFlashcard receives id '6414ae3a0fca52453adde10f'", () => {
    test("Then it should call dispatch with openModal action (which has been called with deleteFlashcardModalError)", async () => {
      const id = "6414ae3a0fca52453adde10f";
      const mockFlashcards = flashcards;
      const testStore = setupStore({ flashcards: mockFlashcards });
      const dispatchSpy = jest.spyOn(testStore, "dispatch");
      const openModalAction = openModalActionCreator(deleteFlashcardModalError);

      await renderHookWithStore(
        useFlashcards,
        testStore,
        "deleteFlashcard"
      )(id);

      expect(dispatchSpy).toHaveBeenCalledWith(openModalAction);
    });
  });

  describe("When createFlashcard is called with a flashcard", () => {
    test("Then it should call dispatch with createFlashcard and openModal action (which has been called with flashcardCreated)", async () => {
      const testStore = setupStore({
        user: {
          ...store.getState().user,
          token: mockToken,
        },
      });
      const dispatchSpy = jest.spyOn(testStore, "dispatch");
      const flashcard = mockFlashcard;
      const openModalAction = openModalActionCreator(flashcardCreated);
      const createFlashcardAction = createFlashcardActionCreator(flashcards[0]);
      const expectedCalledActions = [
        [createFlashcardAction],
        [openModalAction],
      ];

      await renderHookWithStore(
        useFlashcards,
        testStore,
        "createFlashcard"
      )(flashcard);

      expect(dispatchSpy.mock.calls).toStrictEqual(expectedCalledActions);
    });
  });

  describe("When createFlashcard receives a flashcard with empty values", () => {
    test("Then it should call dispatch with openModal action with has been called with flashcardCreatedError", async () => {
      const flashcard: Flashcard = {
        front: "",
        back: "",
        image: "",
        language: "",
      };
      const testStore = setupStore({
        user: {
          ...store.getState().user,
          token: mockToken,
        },
      });
      const dispatchSpy = jest.spyOn(testStore, "dispatch");
      const openModalAction = openModalActionCreator(flashcardCreatedError);

      await renderHookWithStore(
        useFlashcards,
        testStore,
        "createFlashcard"
      )(flashcard);

      expect(dispatchSpy).toHaveBeenCalledWith(openModalAction);
    });
  });
});
