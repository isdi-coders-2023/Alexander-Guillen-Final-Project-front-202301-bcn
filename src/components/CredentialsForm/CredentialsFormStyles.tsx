import { StyleSheet } from "react-native";

const credentialsFormStyles = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
  },
  inputContainer: {
    width: 239,
    gap: 11,
  },
  label: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  input: {
    height: 60,
    backgroundColor: "white",
    borderColor: "#0080FF",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 10,
    paddingLeft: 19.12,
    fontSize: 20,
  },
  shadow: {
    elevation: 10,
  },
});

export default credentialsFormStyles;
