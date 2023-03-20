import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { type store } from "../store/store";

interface WrapperProps {
  store: typeof store;
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ store, children }: WrapperProps) => (
  <Provider store={store}>
    <NavigationContainer>{children}</NavigationContainer>
  </Provider>
);

export default Wrapper;
