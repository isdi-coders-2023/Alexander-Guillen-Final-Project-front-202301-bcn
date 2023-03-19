import React from "react";
import { screen, cleanup, fireEvent } from "@testing-library/react-native";
import Navigator from "./Navigator";
import LottieView from "lottie-react-native";
import renderWithProviders from "../testsUtils/renderWithProviders";
import { store } from "../store/store";

describe("Given a Navigator component", () => {
  describe("When it renders", () => {
    const playSpy = jest.spyOn(LottieView.prototype, "play");

    beforeEach(() => {
      renderWithProviders(<Navigator />);
    });

    afterEach(() => {
      cleanup();
    });

    test("Then it should show two eyes opening when openEyes is true", () => {
      const leftEye = screen.getByLabelText("left eye");
      const rightEye = screen.getByLabelText("right eye");
      const expectedAnimations = [
        [5, 20],
        [5, 20],
      ];

      expect(leftEye).toBeVisible();
      expect(rightEye).toBeVisible();
      expect(playSpy.mock.calls).toStrictEqual(expectedAnimations);
    });

    test("Then it should two eyes closing when openEyes is false", () => {
      playSpy.mockClear();
      renderWithProviders(<Navigator />, {
        ui: { ...store.getState().ui, openEyes: false },
      });
      const expectedAnimations = [
        [20, 5],
        [20, 5],
      ];

      expect(playSpy.mock.calls).toStrictEqual(expectedAnimations);
    });

    test("Then it should show a logo", () => {
      const logo = screen.getByLabelText("Logo");

      expect(logo).toBeVisible();
    });

    test("Then it should show 'Log in To Continue' title", () => {
      const title = "Log in to continue";

      const titleText = screen.getByText(title);

      expect(titleText).toBeVisible();
    });

    test("Then it should show one input 'Username'", () => {
      const usernameEntry = screen.getByLabelText("Username");
      const usernamePlaceholder = "Enter your username";

      expect(usernameEntry).toHaveProp("placeholder", usernamePlaceholder);
    });

    test("And the username input value should change to 'Alexander' when the user types 'Alexander'", () => {
      const usernameEntry = screen.getByLabelText("Username");
      const username = "Alexander";

      fireEvent(usernameEntry, "onChangeText", "Alexander");

      expect(usernameEntry).toHaveProp("value", username);
    });

    test("Then it should show one input 'Password'", () => {
      const passwordEntry = screen.getByLabelText("Password");
      const passwordPlaceholder = "Enter your password";

      expect(passwordEntry).toHaveProp("placeholder", passwordPlaceholder);
    });

    test("And the password input value should change to 'usuario1' when the user types 'usuario1'", () => {
      const passwordEntry = screen.getByLabelText("Password");
      const password = "usuario1";

      fireEvent(passwordEntry, "onChangeText", "usuario1");

      expect(passwordEntry).toHaveProp("value", password);
    });

    test("Then it should show a button 'Log in'", () => {
      const text = "Log in";

      const button = screen.getByRole("button");

      expect(button).toHaveTextContent(text);
    });
  });

  describe("When it renders with isLoading set to true", () => {
    test("Then it should show a loader spinning", () => {
      renderWithProviders(<Navigator />, {
        ui: { ...store.getState().ui, isLoading: true },
      });
      const loader = screen.getByRole("progressbar");
      const isAnimating = true;

      expect(loader).toHaveProp("animating", isAnimating);
    });
  });
});
