import { setupStore } from "../../store";
import {
  closeEyesActionCreator,
  openEyesActionCreator,
  uiReducer,
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
});
