import { createSlice } from "@reduxjs/toolkit";
import { type UiState } from "../../../types";

const uiInitialState: UiState = {
  openEyes: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    openEyes: (currentState) => ({
      ...currentState,
      openEyes: true,
    }),
    closeEyes: (currentState) => ({
      ...currentState,
      openEyes: false,
    }),
  },
});

export const {
  openEyes: openEyesActionCreator,
  closeEyes: closeEyesActionCreator,
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
