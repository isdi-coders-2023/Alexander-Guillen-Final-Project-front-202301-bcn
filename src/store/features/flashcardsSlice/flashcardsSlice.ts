import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type FlashcardPayload, type Flashcards } from "../../../types";

const flashcardsInitialState: Flashcards = [];

const flashcardsSlice = createSlice({
  name: "flashcards",
  initialState: flashcardsInitialState,
  reducers: {
    loadFlashcards: (currentState, action: PayloadAction<Flashcards>) => [
      ...action.payload,
    ],
    deleteFlashcard: (currentState, action: PayloadAction<string>) =>
      currentState.filter(({ id }) => id !== action.payload),
    createFlashcards: (
      currentState,
      action: PayloadAction<FlashcardPayload>
    ) => [...currentState, action.payload],
  },
});

export const {
  loadFlashcards: loadFlashcardsActionCreator,
  deleteFlashcard: deleteFlashcardActionCreator,
  createFlashcards: createFlashcardActionCreator,
} = flashcardsSlice.actions;
export const flashcardsReducer = flashcardsSlice.reducer;
