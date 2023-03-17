import { type StyleProp, StyleSheet, type TextStyle } from "react-native";

const HomeScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 28,
    marginVertical: 50,
  },
  pickerContainer: {
    maxHeight: 60,
    maxWidth: 190,
    borderRadius: 20,
    justifyContent: "center",
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderLeftColor: "#7C80A9",
    borderBottomColor: "#7C80A9",
    marginBottom: 20,
  },
});

export default HomeScreenStyles;
