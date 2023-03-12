import React from "react";
import { cleanup, fireEvent, screen } from "@testing-library/react-native";
import LottieView from "lottie-react-native";
import renderWithProviders from "../../testsUtils/renderWithProviders";
import LoginScreen from "./LoginScreen";
import useUser from "../../hooks/useUser/useUser";
import { type UserCredentials } from "../../types";

const mockedLoginUser = jest.fn();

jest.mock("../../hooks/useUser/useUser", () => () => ({
  loginUser: mockedLoginUser,
}));

describe("Given a Login screen", () => {
  describe("When it renders", () => {
    const playSpy = jest.spyOn(LottieView.prototype, "play");

    beforeEach(() => {
      renderWithProviders(<LoginScreen />);
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
      renderWithProviders(<LoginScreen />, { ui: { openEyes: false } });
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
      const title = "Log in To Continue";

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

    test("And the button press with username 'Alexander' and password 'usuario1' should call loginUser with those credentials", () => {
      const loginUserSpy = jest.spyOn(useUser(), "loginUser");
      const usernameEntry = screen.getByLabelText("Username");
      const passwordEntry = screen.getByLabelText("Password");
      const button = screen.getByRole("button");
      const expectedCredentials: UserCredentials = {
        username: "Alexander",
        password: "usuario1",
      };

      fireEvent.changeText(usernameEntry, "Alexander");
      fireEvent.changeText(passwordEntry, "usuario1");
      fireEvent.press(button);

      expect(mockedLoginUser.mock.calls[0][0]).toStrictEqual(
        expectedCredentials
      );
    });

    test("And the button press with username '=8!%.aT', password 'usuario1' should show 'Invalid credentials' message", () => {
      const usernameEntry = screen.getByLabelText("Username");
      const passwordEntry = screen.getByLabelText("Password");
      const button = screen.getByRole("button");
      const errorMessage =
        "username or password should be at least 8 characters long and only contain alphanumeric";

      fireEvent.changeText(usernameEntry, "=8!%.{aT");
      fireEvent.changeText(passwordEntry, "usuario1");

      expect(screen.queryByRole("alert")).toBeNull();

      fireEvent.press(button);

      expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
    });
  });
});
