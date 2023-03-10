import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User, type UserState } from "../../../types";

const userInitialState: UserState = {
  id: "",
  username: "",
  token: "",
  isLogged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    loginUSer: (currentState, action: PayloadAction<User>): UserState => ({
      ...currentState,
      ...action.payload,
      isLogged: true,
    }),
  },
});

export const { loginUSer: loginUserActionCreator } = userSlice.actions;
export const userReducer = userSlice.reducer;
