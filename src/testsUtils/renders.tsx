import React, { type PropsWithChildren } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { type PreloadedState } from "redux";
import { render, renderHook } from "@testing-library/react-native";
import { setupStore, store, type RootState } from "../store/store";
import Wrapper from "../mocks/Wrapper";

export const renderWithProviders = (
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

export const renderHookWithStore = <T, K extends keyof T>(
  customHook: () => T,
  testStore: typeof store,
  innerFunction: K
): T[K] => {
  const {
    result: { current },
  } = renderHook(() => customHook(), {
    wrapper({ children }) {
      return <Wrapper store={testStore}>{children}</Wrapper>;
    },
  });

  return current[innerFunction];
};
