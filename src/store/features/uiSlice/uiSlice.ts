import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ModalPayload, type UiState } from "../../../types";

const uiInitialState: UiState = {
  openEyes: true,
  modal: {
    title: "",
    message: "",
    isError: false,
    isOpened: false,
  },
  isLoading: false,
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
    openModal: (currentState, action: PayloadAction<ModalPayload>) => ({
      ...currentState,
      modal: {
        ...action.payload,
        isOpened: true,
      },
    }),
    closeModal: (currentState) => ({
      ...currentState,
      modal: {
        title: "",
        message: "",
        isOpened: false,
        isError: currentState.modal.isError,
      },
    }),
    setLoading: (currentState) => ({
      ...currentState,
      isLoading: true,
    }),
    unsetLoading: (currentState) => ({
      ...currentState,
      isLoading: false,
    }),
  },
});

export const {
  openEyes: openEyesActionCreator,
  closeEyes: closeEyesActionCreator,
  openModal: openModalActionCreator,
  closeModal: closeModalActionCreator,
  setLoading: setLoadingActionCreator,
  unsetLoading: unsetLoadingActionCreator,
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
