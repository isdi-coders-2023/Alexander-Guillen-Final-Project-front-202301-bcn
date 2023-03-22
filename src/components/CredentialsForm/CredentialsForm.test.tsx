import React from "react";
import { cleanup, fireEvent, screen } from "@testing-library/react-native";
import CredentialsForm from "./CredentialsForm";
import { type UserCredentials } from "../../types";
import type * as HookModule from "../../store/hooks";
import {
  closeEyesActionCreator,
  openEyesActionCreator,
} from "../../store/features/uiSlice/uiSlice";
import { renderWithProviders } from "../../testsUtils/renders";

const mockDispatch = jest.fn();

jest.mock("../../store/hooks", () => ({
  ...jest.requireActual<typeof HookModule>("../../store/hooks"),
  lingoDeckDispatch: () => mockDispatch,
}));

describe("Given a CredentialsForm component", () => {
  const loginUser = jest.fn();

  beforeEach(() => {
    renderWithProviders(<CredentialsForm text="Log in" onSubmit={loginUser} />);
  });

  afterEach(() => {
    cleanup();
  });

  describe("When it receives 'Log in' text, loginUser function and renders", () => {
    test("Then it should show one input 'Username'", () => {
      const usernamePlaceholder = "Enter your username";

      const usernameEntry = screen.getByLabelText("Username");

      expect(usernameEntry).toHaveProp("placeholder", usernamePlaceholder);
    });

    test("Then it should show one input 'Password'", () => {
      const passwordPlaceholder = "Enter your password";

      const passwordEntry = screen.getByLabelText("Password");

      expect(passwordEntry).toHaveProp("placeholder", passwordPlaceholder);
    });

    test("Then it should show Log in text", () => {
      const text = "Log in";

      const button = screen.getByRole("button");

      expect(button).toHaveTextContent(text);
    });
  });

  describe("When user types 'johndoe' into the username input field", () => {
    test("Then username should be 'johndoe'", () => {
      const username = "johndoe";

      const usernameEntry = screen.getByLabelText("Username");
      fireEvent.changeText(usernameEntry, "johndoe");

      expect(usernameEntry).toHaveProp("value", username);
    });
  });

  describe("When user types 'u9MwspRSDfr!hT6k' into the password input field", () => {
    test("Then password should be 'u9MwspRSDfr!hT6k'", () => {
      const password = "u9MwspRSDfr!hT6k";

      const passwordEntry = screen.getByLabelText("Password");
      fireEvent.changeText(passwordEntry, "u9MwspRSDfr!hT6k");

      expect(passwordEntry).toHaveProp("value", password);
    });

    test("And it should call first dispatch with closeEyes action, and the openEyes action when he delete it", () => {
      const password = "u9MwspRSDfr!hT6k";
      const closeEyesAction = closeEyesActionCreator();
      const openEyesAction = openEyesActionCreator();

      const passwordEntry = screen.getByLabelText("Password");
      fireEvent.changeText(passwordEntry, password);

      expect(mockDispatch.mock.calls[0][0]).toStrictEqual(closeEyesAction);

      fireEvent.changeText(passwordEntry, "");

      expect(mockDispatch.mock.calls[2][0]).toStrictEqual(openEyesAction);
    });
  });

  describe("When it receives username 'Alexander' and password 'usuario1'", () => {
    test("Then the it should call loginUser with that credentials", () => {
      const usernameEntry = screen.getByLabelText("Username");
      const passwordEntry = screen.getByLabelText("Password");
      const button = screen.getByRole("button");
      const userCredentials: UserCredentials = {
        username: "Alexander",
        password: "usuario1",
      };

      fireEvent.changeText(usernameEntry, "Alexander");
      fireEvent.changeText(passwordEntry, "usuario1");
      fireEvent.press(button);

      expect(loginUser).toHaveBeenCalledWith(userCredentials);
    });
  });

  describe("When it receives username '=8!%.{aT', password 'usuario1' and the button is pressed", () => {
    test("Then it should show Invalid credentials message", () => {
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
