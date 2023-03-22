import React from "react";
import { screen } from "@testing-library/react-native";
import Eyes from "./Eyes";
import LottieView from "lottie-react-native";
import { store } from "../../store/store";
import { renderWithProviders } from "../../testsUtils/renders";

describe("Given the Eyes component", () => {
  const playSpy = jest.spyOn(LottieView.prototype, "play");

  afterEach(() => {
    playSpy.mockClear();
  });

  describe("When it renders with openEyes set to true", () => {
    test("Then it should show two eyes opening", async () => {
      renderWithProviders(<Eyes />);
      const leftEye = screen.getByLabelText("left eye");
      const rightEye = screen.getByLabelText("right eye");
      const expectedAnimations = [
        [5, 20],
        [5, 20],
      ];

      expect(leftEye).toBeVisible();
      expect(rightEye).toBeVisible();
      expect(playSpy.mock.calls).toStrictEqual(expectedAnimations);
    });
  });

  describe("When it renders with openEyes set to false", () => {
    test("Then it should show two eyes closing", () => {
      renderWithProviders(<Eyes />, {
        ui: { ...store.getState().ui, openEyes: false },
      });
      const expectedAnimations = [
        [20, 5],
        [20, 5],
      ];

      expect(playSpy.mock.calls).toStrictEqual(expectedAnimations);
    });
  });
});
