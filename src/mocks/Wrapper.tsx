import React from "react";
import { type ThunkMiddleware } from "@reduxjs/toolkit";
import { type ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { Provider } from "react-redux";
import { type AnyAction, type CombinedState } from "redux";
import { type Flashcards, type UiState, type UserState } from "../types";
import { NavigationContainer } from "@react-navigation/native";

interface WrapperProps {
  store: ToolkitStore<
    CombinedState<{
      user: UserState;
      ui: UiState;
      flashcards: Flashcards;
    }>,
    AnyAction,
    [
      ThunkMiddleware<
        CombinedState<{
          user: UserState;
          ui: UiState;
          flashcards: Flashcards;
        }>
      >
    ]
  >;
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ store, children }: WrapperProps) => (
  <Provider store={store}>
    <NavigationContainer>{children}</NavigationContainer>
  </Provider>
);

export default Wrapper;
