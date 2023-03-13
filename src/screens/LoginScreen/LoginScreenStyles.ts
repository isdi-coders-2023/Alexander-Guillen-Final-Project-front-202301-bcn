import { StyleSheet } from "react-native";

const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 30,
  },
  formContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 185,
    borderTopEndRadius: 185,
    height: "80%",
    paddingTop: 80,
    paddingBottom: 30,
    gap: 40,
  },
  logo: {
    width: 50,
    height: 50,
    position: "absolute",
    left: "43.09%",
    top: "-7%",
  },
});

export default LoginScreenStyles;
