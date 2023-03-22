import React from "react";
import { screen, cleanup, fireEvent } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";
import languages from "../../../assets/languages.json";
import { flashcards } from "../../testsUtils/data";
import { renderWithProviders } from "../../testsUtils/renders";

describe("Given a HomeScreen screen", () => {
  describe("When it renders", () => {
    beforeEach(() => {
      renderWithProviders(<HomeScreen />, { flashcards });
    });

    afterEach(() => {
      cleanup();
    });
    test("Then it should show a dropdown menu with languages", () => {
      const languagesDropdown = screen.getByTestId("languages");

      languages.forEach(({ name }) => {
        expect(languagesDropdown).toHaveProp(
          "items",
          expect.arrayContaining([
            expect.objectContaining({ label: name, value: name }),
          ])
        );
      });
    });

    test("Then it should show a list of flashcards with front titles: 'Ciudad', 'Agua', 'Teléfono', 'Perro'", () => {
      const questions = screen.getAllByLabelText("question");

      questions.forEach((question, position) => {
        expect(question).toHaveTextContent(flashcards[position].front);
      });
    });

    test("Then it should show a list of flashcards with back titles: 'City', 'Water', 'Phone', 'Dog'", () => {
      const answers = screen.getAllByLabelText("answer");

      answers.forEach((answer, position) => {
        expect(answer).toHaveTextContent(flashcards[position].back);
      });
    });
  });

  describe("When user clicks on 'English' option", () => {
    test("Then it should change selected language to 'English'", () => {
      renderWithProviders(<HomeScreen />, { flashcards });
      const languagesDropdown = screen.getByTestId("languages");
      const expectedLanguage = "English";

      fireEvent(languagesDropdown, "onValueChange", "English");
      const { selectedIndex }: { selectedIndex: number } =
        languagesDropdown.props;
      const selectedLanguage = languages[selectedIndex].name;

      expect(selectedLanguage).toBe(expectedLanguage);
    });
  });
});
