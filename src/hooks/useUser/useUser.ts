import decodeToken from "jwt-decode";
import axios, { type AxiosError } from "axios";
import {
  type ModalPayload,
  type LoginTokenPayload,
  type TokenResponse,
  type UserCredentials,
} from "../../types";
import { lingoDeckDispatch } from "../../store/hooks";
import { loginUserActionCreator } from "../../store/features/userSlice/userSlice";
import { openModalActionCreator } from "../../store/features/uiSlice/uiSlice";

interface UseUser {
  loginUser: (userCredentials: UserCredentials) => Promise<void>;
}

const useUser = (): UseUser => {
  const dispatch = lingoDeckDispatch();

  const loginUser = async (userCredentials: UserCredentials) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL!}/user/login`,
        userCredentials
      );

      const { token } = response.data as TokenResponse;

      const { id, username } = decodeToken<LoginTokenPayload>(token);

      dispatch(loginUserActionCreator({ id, username, token }));
    } catch (error) {
      const loginError: ModalPayload = {
        title: "Wrong credentials",
        message: "Password or username were incorrect",
        isError: true,
      };

      dispatch(openModalActionCreator(loginError));
    }
  };

  return { loginUser };
};

export default useUser;
