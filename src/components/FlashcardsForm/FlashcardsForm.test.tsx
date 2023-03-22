import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";
import FlashcardsForm from "./FlashcardsForm";
import languages from "../../../assets/languages.json";

describe("Given a FlashcardsForm component", () => {
  describe("When it renders with an action and button text 'Add'", () => {
    const action = jest.fn();

    beforeEach(() => {
      render(<FlashcardsForm onSubmit={action} onSubmitText="Add" />);
    });

    afterEach(() => {
      cleanup();
    });

    test("Then it should show an input for the flashcard front", () => {
      const frontEntry = screen.getByLabelText("Front");

      expect(frontEntry).toBeOnTheScreen();
    });

    test("And the input value of the front should change to 'Cat' when the user types 'Cat'", () => {
      const expectedValue = "Cat";
      const frontEntry = screen.getByLabelText("Front");

      fireEvent.changeText(frontEntry, "Cat");

      expect(frontEntry).toHaveProp("value", expectedValue);
    });

    test("Then it should show an input for the flashcard back", () => {
      const backEntry = screen.getByLabelText("Back");

      expect(backEntry).toBeOnTheScreen();
    });

    test("And the input value of the back should change to 'Gato' when the user types 'Gato'", () => {
      const expectedValue = "Gato";
      const backEntry = screen.getByLabelText("Back");

      fireEvent.changeText(backEntry, "Gato");

      expect(backEntry).toHaveProp("value", expectedValue);
    });

    test("Then it should show a dropdown menu with languages", () => {
      const languagesDropdown = screen.getByTestId("languages");

      languages.slice(1).forEach(({ name }) => {
        expect(languagesDropdown).toHaveProp(
          "items",
          expect.arrayContaining([
            expect.objectContaining({ label: name, value: name }),
          ])
        );
      });
    });

    test("Then it should change selected language to 'English' when user selects 'English'", () => {
      const languagesDropdown = screen.getByTestId("languages");
      const expectedLanguage = "English";

      fireEvent(languagesDropdown, "onValueChange", "English");
      const { selectedIndex }: { selectedIndex: number } =
        languagesDropdown.props;
      const selectedLanguage = languages.slice(1)[selectedIndex].name;

      expect(selectedLanguage).toBe(expectedLanguage);
    });

    test("Then it should show an input for the flashcard image", () => {
      const imageEntry = screen.getByLabelText("Image");

      expect(imageEntry).toBeOnTheScreen();
    });

    test("And the input value should change to image-example.png when the user types image-example.png", () => {
      const imageEntry = screen.getByLabelText("Image");
      const expectedValue = "image-example.png";

      fireEvent.changeText(imageEntry, "image-example.png");

      expect(imageEntry).toHaveProp("value", expectedValue);
    });

    test("Then it should show a button with text 'Add'", () => {
      const button = screen.getByRole("button");

      expect(button).toBeOnTheScreen();
    });

    test("And it should call onSubmit action when it is pressed", () => {
      const button = screen.getByRole("button");

      fireEvent.press(button);

      expect(action).toHaveBeenCalled();
    });

    test("Then it should show a cancel link", () => {
      const cancelLink = screen.getByRole("link");

      expect(cancelLink).toBeOnTheScreen();
    });
  });
});
