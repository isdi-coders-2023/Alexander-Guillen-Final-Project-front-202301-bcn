import React from "react";
import { screen, cleanup } from "@testing-library/react-native";
import Loader from "./Loader";
import { store } from "../../store/store";
import { renderWithProviders } from "../../testsUtils/renders";

describe("Given a Loader component", () => {
  describe("When it renders with isLoading set to false", () => {
    beforeEach(() => {
      renderWithProviders(<Loader />);
    });

    afterEach(() => {
      cleanup();
    });

    test("Then it should show a Loader", () => {
      const loader = screen.getByRole("progressbar");

      expect(loader).toBeOnTheScreen();
    });

    test("And the loader should be still", () => {
      const loader = screen.getByRole("progressbar");
      const isAnimating = false;

      expect(loader).toHaveProp("animating", isAnimating);
    });
  });

  describe("When it renders with isLoading set to true", () => {
    test("Then the loader should be spinning", () => {
      renderWithProviders(<Loader />, {
        ui: { ...store.getState().ui, isLoading: true },
      });
      const loader = screen.getByRole("progressbar");
      const isAnimating = true;

      expect(loader).toHaveProp("animating", isAnimating);
    });
  });
});
