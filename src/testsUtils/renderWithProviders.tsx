import React, { type PropsWithChildren } from "react";
import { type PreloadedState } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react-native";
import { setupStore, store, type RootState } from "../store/store";

const renderWithProviders = (
  ui: React.ReactElement,
  preloadedSate?: PreloadedState<RootState>
) => {
  const testStore = preloadedSate ? setupStore(preloadedSate) : store;

  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => (
    <Provider store={testStore}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper });
};

export default renderWithProviders;
