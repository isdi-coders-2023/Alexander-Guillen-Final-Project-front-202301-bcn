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
    back: "City",
    front: "Ciudad",
    image: "https://tinyurl.com/2oaqyv8u",
    imageBackup: "https://tinyurl.com/2oaqyv8u",
    language: "English",
  },
  {
    id: "64112a0bc69ab057352c5014",
    back: "Water",
    front: "Agua",
    image: "https://tinyurl.com/y6sx8k2q",
    imageBackup: "https://tinyurl.com/y6sx8k2q",
    language: "English",
  },
  {
    id: "64112a1931db01e684891578",
    back: "Phone",
    front: "Teléfono",
    image: "https://tinyurl.com/2p9n4m24",
    imageBackup: "https://tinyurl.com/2p9n4m24",
    language: "English",
  },
  {
    id: "6411256731db01e684891578",
    back: "Dog",
    front: "Perro",
    image: "https://tinyurl.com/2h8r9xv6",
    imageBackup: "https://tinyurl.com/2h8r9xv6",
    language: "English",
  },
];
