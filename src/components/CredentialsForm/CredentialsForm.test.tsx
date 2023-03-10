import React from "react";
import { cleanup, render, screen } from "@testing-library/react-native";
import CredentialsForm from "./CredentialsForm";

describe("Given a CredentialsForm component", () => {
  describe("When it renders", () => {
    beforeEach(() => {
      render(<CredentialsForm />);
    });

    afterEach(() => {
      cleanup();
    });

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
});
