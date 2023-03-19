import React, { type PropsWithChildren } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { type PreloadedState } from "redux";
import { render } from "@testing-library/react-native";
import { setupStore, store, type RootState } from "../store/store";

const renderWithProviders = (
  ui: React.ReactElement,
  preloadedSate?: PreloadedState<RootState>
) => {
  const testStore = preloadedSate ? setupStore(preloadedSate) : store;

  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => (
    <NavigationContainer>
      <Provider store={testStore}>{children}</Provider>
    </NavigationContainer>
  );

  return render(ui, { wrapper: Wrapper });
};

export default renderWithProviders;
