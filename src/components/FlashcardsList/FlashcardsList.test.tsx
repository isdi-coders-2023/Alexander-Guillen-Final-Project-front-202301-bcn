import React from "react";
import FlashcardsList from "./FlashcardsList";
import { flashcards } from "../../testsUtils/data";
import { renderWithProviders } from "../../testsUtils/renders";

describe("Given a FlashcardsList component", () => {
  describe("When it renders with four flashcards", () => {
    test("Then it should show four front card titles: 'Ciudad', 'Agua', 'Agua', 'Perro'", () => {
      const frontText = /^Ciudad$/;
      const frontText2 = /^Agua$/;
      const frontText3 = /^Perro$/;
      const frontText4 = /^Ciudad$/;

      const { getByText } = renderWithProviders(
        <FlashcardsList flashcards={flashcards} />
      );
      const front = getByText(frontText);
      const front2 = getByText(frontText2);
      const front3 = getByText(frontText3);
      const front4 = getByText(frontText4);

      expect(front).toBeOnTheScreen();
      expect(front2).toBeOnTheScreen();
      expect(front3).toBeOnTheScreen();
      expect(front4).toBeOnTheScreen();
    });

    test("Then it should show four back card titles: 'City', 'Water', 'Water', 'Dog'", () => {
      const backText = /^City$/;
      const backText2 = /^Water$/;
      const backText3 = /^Dog$/;
      const backText4 = /^City$/;

      const { getByText } = renderWithProviders(
        <FlashcardsList flashcards={flashcards} />
      );
      const back = getByText(backText);
      const back2 = getByText(backText2);
      const back3 = getByText(backText3);
      const back4 = getByText(backText4);

      expect(back).toBeOnTheScreen();
      expect(back2).toBeOnTheScreen();
      expect(back3).toBeOnTheScreen();
      expect(back4).toBeOnTheScreen();
    });
  });
});
