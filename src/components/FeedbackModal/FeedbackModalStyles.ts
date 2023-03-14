import { StyleSheet } from "react-native";

const ModalArticleStyles = StyleSheet.create({
  article: {
    height: 200,
    width: 307,
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 23,
    elevation: 20,
  },
});

const FeedbackModalStyles = StyleSheet.create({
  opacityView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  onError: {
    ...ModalArticleStyles.article,
    backgroundColor: "#C90C00",
  },
  onSuccess: {
    ...ModalArticleStyles.article,
    backgroundColor: "#3B9353",
  },
  close: {
    position: "absolute",
    top: 20,
    left: 240,
  },
  title: {
    width: 150,
    fontSize: 25,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
  message: {
    width: 250,
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
  },
});

export default FeedbackModalStyles;
