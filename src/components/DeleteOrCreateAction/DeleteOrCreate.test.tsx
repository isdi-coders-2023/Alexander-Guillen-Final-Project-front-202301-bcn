import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";
import DeleteOrCreateAction from "./DeleteOrCreateAction";

describe("Given a DeleteOrCreateAction component", () => {
  const deleteButtonName = "delete";

  describe("When it renders with isDelete set to true and an action", () => {
    const action = jest.fn();

    beforeEach(() => {
      render(<DeleteOrCreateAction isDelete={true} action={action} />);
    });

    afterEach(() => {
      cleanup();
    });

    test("Then it should show a button with accesible name 'delete'", () => {
      const deleteButton = screen.getByLabelText(deleteButtonName);

      expect(deleteButton).toBeOnTheScreen();
    });

    test("Then it should call the action when the button is clicked", () => {
      const deleteButton = screen.getByLabelText(deleteButtonName);

      fireEvent.press(deleteButton);

      expect(action).toHaveBeenCalled();
    });

    describe("When it renders with isDelete set to false", () => {
      test("Then it should show nothing", () => {
        render(<DeleteOrCreateAction isDelete={false} />);

        const button = screen.queryByLabelText(deleteButtonName);

        expect(button).toBeNull();
      });
    });
  });
});
