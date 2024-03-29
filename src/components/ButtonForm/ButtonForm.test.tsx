import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";
import ButtonForm from "./ButtonForm";

describe("Given a ButtonAction component", () => {
  describe("When it receives an action, 'Log in' text and renders", () => {
    const action = jest.fn();

    beforeEach(() => {
      render(<ButtonForm action={action} text="Log in" />);
    });

    afterEach(() => {
      cleanup();
    });

    test("Then it should show Log in text", () => {
      const text = "Log in";

      const button = screen.getByRole("button");

      expect(button).toHaveTextContent(text);
    });

    test("Then it should call action when it is pressed", () => {
      const button = screen.getByRole("button");

      fireEvent.press(button);

      expect(action).toHaveBeenCalled();
    });
  });
});
