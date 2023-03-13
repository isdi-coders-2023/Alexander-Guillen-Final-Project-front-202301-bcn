import { setupStore } from "../store/store";
import { type LoginTokenPayload, type UserCredentials } from "../types";

export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
export const testStore = setupStore();
export const tokenPayload: LoginTokenPayload = {
  username: "Alexander",
  id: "6409d298f5c4e943969fc56f",
};
export const userCredentials: UserCredentials = {
  username: "Alexander",
  password: "j4lkLZ6PJI7W4d3",
};
