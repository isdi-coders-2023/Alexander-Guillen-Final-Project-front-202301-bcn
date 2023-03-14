import { type UiState, type ModalPayload } from "../../../types";
import { setupStore } from "../../store";
import {
  closeEyesActionCreator,
  closeModalActionCreator,
  openEyesActionCreator,
  openModalActionCreator,
  setLoadingActionCreator,
  uiReducer,
  unsetLoadingActionCreator,
} from "./uiSlice";

describe("Given a uiReducer", () => {
  const uiInitialState = setupStore().getState().ui;

  describe("When it receives an closeEyes action", () => {
    test("Then should return a Ui state with openEyes set to false", () => {
      const closeEyesAction = closeEyesActionCreator();

      const newUiState = uiReducer(uiInitialState, closeEyesAction);

      expect(newUiState).toHaveProperty("openEyes", false);
    });
  });

  describe("When it receives an openEyes action", () => {
    test("Then should return a Ui state with openEyes set to true", () => {
      uiInitialState.openEyes = false;
      const openEyesAction = openEyesActionCreator();

      const newUiState = uiReducer(uiInitialState, openEyesAction);

      expect(newUiState).toHaveProperty("openEyes", true);
    });
  });

  describe("When it receives an openModal action with title 'Wrong credentials', message 'Credentials were incorrect' and isError 'true'", () => {
    test("Then it should return a Ui state modal with those properties and isOpened set to true", () => {
      const modalPayload: ModalPayload = {
        title: "Wrong credentials",
        message: "Credentials were incorrect",
        isError: true,
      };
      const openModalAction = openModalActionCreator(modalPayload);
      const expectedNewUiState: UiState = {
        openEyes: uiInitialState.openEyes,
        modal: {
          ...modalPayload,
          isOpened: true,
        },
        isLoading: uiInitialState.isLoading,
      };

      const newUiState = uiReducer(uiInitialState, openModalAction);

      expect(newUiState).toStrictEqual(expectedNewUiState);
    });
  });

  describe("When it receives a closeModal action", () => {
    test("Then it should return a new Ui state with modal set to its initial state", () => {
      const currentUiState: UiState = {
        openEyes: uiInitialState.openEyes,
        modal: {
          title: "Wrong credentials",
          message: "Credentials were incorrect",
          isError: true,
          isOpened: true,
        },
        isLoading: uiInitialState.isLoading,
      };
      const expectedNewUiState: UiState = {
        openEyes: uiInitialState.openEyes,
        modal: {
          ...uiInitialState.modal,
          isError: true,
        },
        isLoading: uiInitialState.isLoading,
      };
      const closeModalAction = closeModalActionCreator();

      const newUiState = uiReducer(currentUiState, closeModalAction);

      expect(newUiState).toStrictEqual(expectedNewUiState);
    });
  });

  describe("When it receives an setLoading action", () => {
    test("Then it should return a new Ui state with isLoading set to true", () => {
      const setLoadingAction = setLoadingActionCreator();

      const newUiState = uiReducer(uiInitialState, setLoadingAction);

      expect(newUiState).toHaveProperty("isLoading", true);
    });
  });

  describe("When it receives an unsetIsLoading action", () => {
    test("Then it should return a new Ui state with isLoading set to false", () => {
      const currentUiState: UiState = {
        ...uiInitialState,
        isLoading: true,
      };

      const unsetLoadingAction = unsetLoadingActionCreator();

      const newUiState = uiReducer(currentUiState, unsetLoadingAction);

      expect(newUiState).toHaveProperty("isLoading", false);
    });
  });
});
