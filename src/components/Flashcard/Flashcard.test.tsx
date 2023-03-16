import React from "react";
import "core-js";
import "@jest/fake-timers";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";
import { type Flashcard } from "../../types";
import FlashcardFlip from "./Flashcard";

describe("Given a Flashcard component", () => {
  const flashcard: Partial<Flashcard> = {
    front: "Cat",
    back: "Chateau",
    imageBackup: "http://placekitten.com/g/200/300",
  };

  beforeEach(() => {
    render(<FlashcardFlip flashcard={flashcard as Flashcard} />);
  });

  afterEach(() => {
    cleanup();
  });

  describe("When it renders with front 'Cat', back 'Chateau'", () => {
    test("Then text 'Cat' should be on the front and text 'Chateau' should be on the back", () => {
      const frontText = /^Cat$/;
      const backText = /^Chateau$/;

      const front = screen.getByLabelText("question");
      const back = screen.getByLabelText("answer");

      expect(front).toHaveTextContent(frontText);
      expect(back).toHaveTextContent(backText);
      expect(front).toHaveStyle({ transform: [{ rotateY: "0deg" }] });
      expect(back).toHaveStyle({ transform: [{ rotateY: "180deg" }] });
    });

    test("Then it should show text 'Cat' on the front and text 'Chateau' should be on the back, when clicked two times", async () => {
      const frontText = /^Cat$/;
      const backText = /^Chateau$/;

      const button = screen.getByRole("button");
      fireEvent.press(button);
      fireEvent.press(button);

      const front = screen.getByLabelText("question");
      const back = screen.getByLabelText("answer");

      expect(front).toHaveTextContent(frontText);
      expect(back).toHaveTextContent(backText);
      expect(front).toHaveStyle({ transform: [{ rotateY: "0deg" }] });
      expect(back).toHaveStyle({ transform: [{ rotateY: "180deg" }] });
    });
  });
});