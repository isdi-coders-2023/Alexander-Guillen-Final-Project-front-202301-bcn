import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Image,
} from "react-native";
import useFlashcards from "../../hooks/useFlashcards/useFlashcards";
import { type Flashcard } from "../../types";
import DeleteOrCreateAction from "../DeleteOrCreateAction/DeleteOrCreateAction";
import FlashcardStyles from "./FlashcardStyles";

interface FlashcardProps {
  flashcard: Flashcard;
}

const FlashcardFlip = ({
  flashcard: { image, front, back, id },
}: FlashcardProps) => {
  const { deleteFlashcard } = useFlashcards();
  const [isFlipped, setIsFlipped] = useState(false);
  const flipValue = useRef(new Animated.Value(0)).current;

  const onDelete = async () => {
    await deleteFlashcard(id);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.spring(flipValue, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <TouchableWithoutFeedback onPress={flipCard} accessibilityRole="button">
      <View style={FlashcardStyles.cardContainer}>
        <Animated.View
          style={[FlashcardStyles.cardFace, frontAnimatedStyle]}
          accessibilityLabel="question"
        >
          <DeleteOrCreateAction isDelete={true} action={onDelete} />
          <Image
            source={{ uri: image }}
            style={FlashcardStyles.cardImage}
            accessibilityLabel={front}
          />
          <View style={FlashcardStyles.cardContent}>
            <Text style={FlashcardStyles.cardText}>{front}</Text>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            FlashcardStyles.cardFace,
            FlashcardStyles.cardBack,
            backAnimatedStyle,
          ]}
          accessibilityLabel="answer"
        >
          <DeleteOrCreateAction isDelete={true} action={onDelete} />
          <Image
            source={{ uri: image }}
            style={FlashcardStyles.cardImage}
            accessibilityLabel={back}
          />
          <View style={FlashcardStyles.cardContent}>
            <Text style={FlashcardStyles.cardText}>{back}</Text>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FlashcardFlip;
