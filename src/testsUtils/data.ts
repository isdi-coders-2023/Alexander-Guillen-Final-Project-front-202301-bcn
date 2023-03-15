import { setupStore } from "../store/store";
import {
  type Flashcards,
  type LoginTokenPayload,
  type UserCredentials,
} from "../types";

export const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
export const testStore = setupStore();
export const tokenPayload: LoginTokenPayload = {
  username: "Alexander",
  id: "6409d298f5c4e943969fc56f",
};
export const userCredentials: UserCredentials = {
  username: "Alexander",
  password: "j4lkLZ6PJI7W4d3",
};

export const flashcards: Flashcards = [
  {
    id: "641129f79f3cfb43b4418b1e",
    back: "The capital city of France",
    front: "What is Paris?",
    image: "https://example.com/paris.jpg",
    imageBackup: "https://example.com/paris_backup.jpg",
    language: "English",
  },
  {
    id: "64112a0bc69ab057352c5014",
    back: "The chemical symbol for water",
    front: "What is H2O?",
    image: "https://example.com/h2o.jpg",
    imageBackup: "https://example.com/h2o_backup.jpg",
    language: "English",
  },
  {
    id: "64112a1931db01e684891578",
    back: "The year the first iPhone was released",
    front: "What is 2007?",
    image: "https://example.com/iphone.jpg",
    imageBackup: "https://example.com/iphone_backup.jpg",
    language: "English",
  },
];
