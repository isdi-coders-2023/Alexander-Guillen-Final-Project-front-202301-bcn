import React from "react";
import { renderHook } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { setupStore, store } from "../../store/store";
import useFlashcards from "./useFlashcards";
import { flashcards, mockToken } from "../../testsUtils/data";
import {
  openModalActionCreator,
  setLoadingActionCreator,
  unsetLoadingActionCreator,
} from "../../store/features/uiSlice/uiSlice";
import { loadFlashcardsActionCreator } from "../../store/features/flashcardsSlice/flashcardsSlice";
import { type ModalPayload } from "../../types";

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

      const {
        result: {
          current: { loadFlashcards },
        },
      } = renderHook(() => useFlashcards(), {
        wrapper({ children }) {
          return <Provider store={testStore}>{children}</Provider>;
        },
      });

      await loadFlashcards();

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

      const {
        result: {
          current: { loadFlashcards },
        },
      } = renderHook(() => useFlashcards(), {
        wrapper({ children }) {
          return <Provider store={testStore}>{children}</Provider>;
        },
      });

      await loadFlashcards();

      expect(dispatchSpy.mock.calls).toStrictEqual(expectedCalledActions);
    });
  });
});
