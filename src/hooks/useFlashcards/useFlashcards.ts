import { useCallback } from "react";
import axios from "axios";
import {
  createFlashcardActionCreator,
  deleteFlashcardActionCreator,
  loadFlashcardsActionCreator,
} from "../../store/features/flashcardsSlice/flashcardsSlice";
import {
  openModalActionCreator,
  setLoadingActionCreator,
  unsetLoadingActionCreator,
} from "../../store/features/uiSlice/uiSlice";
import { lingoDeckDispatch, lingoDeckSelector } from "../../store/hooks";
import {
  deleteFlashcardModal,
  deleteFlashcardModalError,
  flashcardCreated,
  flashcardCreatedError,
} from "../../testsUtils/data";
import {
  type FlashcardResponse,
  type Flashcard,
  type FlashcardsResponse,
  type ModalPayload,
} from "../../types";

interface UseFlashcards {
  loadFlashcards: () => Promise<void>;
  deleteFlashcard: (flashcardId: string) => Promise<void>;
  createFlashcard: (requestFlashcard: Flashcard) => Promise<void>;
}

const useFlashcards = (): UseFlashcards => {
  const apiUrl = process.env.REACT_APP_API_URL!;
  const dispatch = lingoDeckDispatch();
  const token = lingoDeckSelector(({ user: { token } }) => token);

  const loadFlashcards = useCallback(async () => {
    try {
      dispatch(setLoadingActionCreator());
      const response = await axios.get(`${apiUrl}/flashcards`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { flashcards } = response.data as FlashcardsResponse;

      dispatch(loadFlashcardsActionCreator(flashcards));

      dispatch(unsetLoadingActionCreator());
    } catch (error) {
      dispatch(unsetLoadingActionCreator());

      const flashcardsError: ModalPayload = {
        title: "Error!",
        message: "Couldn't load the flashcards. Refresh the page",
        isError: true,
      };

      dispatch(openModalActionCreator(flashcardsError));
    }
  }, []);

  const deleteFlashcard = async (flashcardId: string) => {
    try {
      await axios.delete(`${apiUrl}/flashcards/${flashcardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(deleteFlashcardActionCreator(flashcardId));

      dispatch(openModalActionCreator(deleteFlashcardModal));
    } catch (error) {
      dispatch(openModalActionCreator(deleteFlashcardModalError));
    }
  };

  const createFlashcard = async (requestFlashcard: Flashcard) => {
    try {
      const response = await axios.post(
        `${apiUrl}/flashcards`,
        requestFlashcard,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { flashcard } = response.data as FlashcardResponse;

      dispatch(createFlashcardActionCreator(flashcard));

      dispatch(openModalActionCreator(flashcardCreated));
    } catch (error) {
      dispatch(openModalActionCreator(flashcardCreatedError));
    }
  };

  return { loadFlashcards, deleteFlashcard, createFlashcard };
};

export default useFlashcards;
