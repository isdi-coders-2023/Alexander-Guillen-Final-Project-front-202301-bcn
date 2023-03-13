import React from "react";
import { cleanup, screen } from "@testing-library/react-native";
import { store } from "../../store/store";
import renderWithProviders from "../../testsUtils/renderWithProviders";
import { type Modal } from "../../types";
import FeedbackModal from "./FeedbackModal";

describe("Given a FeedbackModal component", () => {
  const modalPreloadedState: Modal = {
    title: "Wrong credentials",
    message: "Username or password were incorrect",
    isOpened: true,
    isError: true,
  };

  describe("When it renders with title 'Wrong credentials', message 'Username or password were incorrect', isOpened 'true' and isError true ", () => {
    beforeEach(() => {
      renderWithProviders(<FeedbackModal />, {
        ui: { ...store.getState().ui, modal: modalPreloadedState },
      });
    });

    afterEach(() => {
      cleanup();
    });

    test("Then it should show title 'Wrong credentials'", () => {
      const title = screen.getByText("Wrong credentials");

      expect(title).toBeOnTheScreen();
    });

    test("Then it should show 'Username or password were incorrect'", () => {
      const message = screen.getByText("Username or password were incorrect");

      expect(message).toBeOnTheScreen();
    });

    test("Then it should show a delete button", () => {
      const button = screen.getByLabelText("delete");

      expect(button).toBeOnTheScreen();
    });

    test("The it should have a red color", () => {
      const modalArticle = screen.getByRole("alert");

      expect(modalArticle).toHaveStyle({ backgroundColor: "#C90C00" });
    });
  });

  describe("When it renders with isError set to false", () => {
    const successTypeModal: Modal = {
      ...modalPreloadedState,
      isError: false,
    };

    test("Then it should have a green color", () => {
      renderWithProviders(<FeedbackModal />, {
        ui: { ...store.getState().ui, modal: successTypeModal },
      });
      const modalArticle = screen.getByRole("alert");

      expect(modalArticle).toHaveStyle({ backgroundColor: "#3B9353" });
    });
  });
});
