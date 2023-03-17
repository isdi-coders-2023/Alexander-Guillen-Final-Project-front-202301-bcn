import React from "react";
import { FlatList, View } from "react-native";
import { type Flashcards } from "../../types";
import FlashcardFlip from "../Flashcard/Flashcard";

interface FlashcardsListProps {
  flashcards: Flashcards;
}

const FlashcardsList = ({ flashcards }: FlashcardsListProps): JSX.Element => (
  <View style={{ flex: 1 }}>
    <FlatList
      data={flashcards}
      renderItem={(renderItem) => <FlashcardFlip flashcard={renderItem.item} />}
      contentContainerStyle={{
        gap: 51,
      }}
    />
  </View>
);

export default FlashcardsList;
