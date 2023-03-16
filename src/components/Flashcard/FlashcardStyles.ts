import { StyleSheet } from "react-native";

const FlashcardStyles = StyleSheet.create({
  cardContainer: {
    width: 293,
    height: 288,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backfaceVisibility: "hidden",
    backgroundColor: "#FFF",
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderTopStartRadius: 20,
    borderLeftColor: "#7C80A9",
    borderBottomColor: "#7C80A9",
  },
  cardBack: {
    transform: [{ rotateY: "180deg" }],
  },
  cardImage: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContent: {
    minWidth: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontFamily: "Jost_400Regular",
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default FlashcardStyles;
