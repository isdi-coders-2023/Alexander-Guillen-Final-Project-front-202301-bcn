import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { type Flashcards } from "../../types";
import FlashcardFlip from "../Flashcard/Flashcard";

interface FlashcardsListProps {
  flashcards: Flashcards;
}

const FlashcardsList = ({ flashcards }: FlashcardsListProps): JSX.Element => (
  <SafeAreaView>
    <FlatList
      data={flashcards}
      renderItem={(renderItem) => <FlashcardFlip flashcard={renderItem.item} />}
      contentContainerStyle={{ gap: 51 }}
    />
  </SafeAreaView>
);

export default FlashcardsList;
