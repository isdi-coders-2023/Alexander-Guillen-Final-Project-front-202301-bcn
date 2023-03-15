import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Flashcard, type Flashcards } from "../../../types";

const flashcardsInitialState: Flashcards = [];

const flashcardsSlice = createSlice({
  name: "flashcards",
  initialState: flashcardsInitialState,
  reducers: {
    loadFlashcards: (currentState, action: PayloadAction<Flashcards>) => [
      ...action.payload,
    ],
  },
});

export const { loadFlashcards: loadFlashcardsActionCreator } =
  flashcardsSlice.actions;

export const flashcardsReducer = flashcardsSlice.reducer;
