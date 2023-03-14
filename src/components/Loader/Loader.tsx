import React from "react";
import { View, ActivityIndicator } from "react-native";
import { lingoDeckSelector } from "../../store/hooks";
import LoaderStyles from "./LoaderStyles";

const Loader = (): JSX.Element => {
  const isLoading = lingoDeckSelector(({ ui: { isLoading } }) => isLoading);

  return (
    <View style={LoaderStyles.overlay}>
      <ActivityIndicator
        size="large"
        color="#4353FF"
        animating={isLoading}
        style={LoaderStyles.loader}
        accessibilityRole="progressbar"
      />
    </View>
  );
};

export default Loader;
