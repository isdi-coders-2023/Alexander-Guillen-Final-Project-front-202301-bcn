import AsyncStorage from "@react-native-async-storage/async-storage";
import decodeToken from "jwt-decode";
import axios from "axios";
import {
  type ModalPayload,
  type LoginTokenPayload,
  type TokenResponse,
  type UserCredentials,
} from "../../types";
import { lingoDeckDispatch } from "../../store/hooks";
import { loginUserActionCreator } from "../../store/features/userSlice/userSlice";
import {
  openModalActionCreator,
  setLoadingActionCreator,
  unsetLoadingActionCreator,
} from "../../store/features/uiSlice/uiSlice";

interface UseUser {
  loginUser: (userCredentials: UserCredentials) => Promise<void>;
}

const useUser = (): UseUser => {
  const dispatch = lingoDeckDispatch();

  const loginUser = async (userCredentials: UserCredentials) => {
    try {
      dispatch(setLoadingActionCreator());
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL!}/user/login`,
        userCredentials
      );

      const { token } = response.data as TokenResponse;

      const { id, username } = decodeToken<LoginTokenPayload>(token);

      await AsyncStorage.setItem("token", token);

      dispatch(loginUserActionCreator({ id, username, token }));
      dispatch(unsetLoadingActionCreator());
    } catch (error) {
      dispatch(unsetLoadingActionCreator());

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
