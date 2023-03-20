import React from "react";
import { Text, Pressable } from "react-native";
import buttonFormStyles from "./ButtonFormStyles";

interface ButtonActionProps {
  text: string;
  action: () => void;
}

const ButtonForm = ({ text, action }: ButtonActionProps): JSX.Element => (
  <Pressable
    style={buttonFormStyles.button}
    onPress={action}
    accessibilityRole="button"
  >
    <Text style={buttonFormStyles.text}>{text}</Text>
  </Pressable>
);

export default ButtonForm;
