import { StyleSheet } from "react-native";

const LoaderStyles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  loader: {
    zIndex: 1,
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
  },
});

export default LoaderStyles;
