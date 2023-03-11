import React from "react";
import { Text, Pressable } from "react-native";
import buttonActionStyles from "./ButtonActionStyles";

interface ButtonActionProps {
  text: string;
  action: (event: { preventDefault: () => void }) => void;
}

const ButtonAction = ({ text, action }: ButtonActionProps): JSX.Element => (
  <Pressable
    style={buttonActionStyles.button}
    onPress={action}
    accessibilityRole="button"
  >
    <Text style={buttonActionStyles.text}>{text}</Text>
  </Pressable>
);

export default ButtonAction;
