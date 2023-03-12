import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { lingoDeckSelector } from "../../store/hooks";
import eyes from "../../../assets/eyes.json";
import EyesStyles from "./EyesStyles";

const Eyes = (): JSX.Element => {
  const { openEyes } = lingoDeckSelector((state) => state.ui);
  const leftEyeRef = useRef<LottieView>(null);
  const rightEyeRef = useRef<LottieView>(null);

  useEffect(() => {
    if (openEyes) {
      leftEyeRef.current?.play(5, 20);
      rightEyeRef.current?.play(5, 20);
    } else {
      leftEyeRef.current?.play(20, 5);
      rightEyeRef.current?.play(20, 5);
    }
  }, [openEyes]);

  return (
    <View style={EyesStyles.eyesContainer}>
      <LottieView
        ref={leftEyeRef}
        source={eyes}
        style={EyesStyles.eye}
        loop={false}
        accessibilityLabel="left eye"
      />
      <LottieView
        ref={rightEyeRef}
        source={eyes}
        style={EyesStyles.eye}
        loop={false}
        accessibilityLabel="right eye"
      />
    </View>
  );
};

export default Eyes;
