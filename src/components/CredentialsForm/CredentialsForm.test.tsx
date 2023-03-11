import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";
import CredentialsForm from "./CredentialsForm";

describe("Given a CredentialsForm component", () => {
  beforeEach(() => {
    render(<CredentialsForm />);
  });

  afterEach(() => {
    cleanup();
  });

  describe("When it renders", () => {
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
  });

  describe("When user types 'johndoe' into the username input field", () => {
    test("Then username should be 'johndoe'", () => {
      const username = "johndoe";

      const usernameEntry = screen.getByLabelText("Username");
      fireEvent(usernameEntry, "onChangeText", "johndoe");

      expect(usernameEntry).toHaveProp("value", username);
    });
  });

  describe("When user types 'u9MwspRSDfr!hT6k' into the password input field", () => {
    test("Then password should be 'u9MwspRSDfr!hT6k'", () => {
      const password = "u9MwspRSDfr!hT6k";

      const passwordEntry = screen.getByLabelText("Password");
      fireEvent(passwordEntry, "onChangeText", "u9MwspRSDfr!hT6k");

      expect(passwordEntry).toHaveProp("value", password);
    });
  });
});
