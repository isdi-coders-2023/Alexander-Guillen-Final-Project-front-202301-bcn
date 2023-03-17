import axios from "axios";
import {
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
} from "../../testsUtils/data";
import { type FlashcardsResponse, type ModalPayload } from "../../types";

interface UseFlashcards {
  loadFlashcards: () => Promise<void>;
  deleteFlashcard: (flashcardId: string) => Promise<void>;
}

const useFlashcards = (): UseFlashcards => {
  const apiUrl = process.env.REACT_APP_API_URL!;
  const dispatch = lingoDeckDispatch();
  const token = lingoDeckSelector(({ user: { token } }) => token);

  const loadFlashcards = async () => {
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
  };

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

  return { loadFlashcards, deleteFlashcard };
};

export default useFlashcards;
