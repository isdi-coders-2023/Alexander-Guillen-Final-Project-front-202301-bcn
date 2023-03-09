import decodeToken from "jwt-decode";
import axios from "axios";
import {
  type LoginTokenPayload,
  type TokenResponse,
  type UserCredentials,
} from "../../types";
import { lingoDeckDispatch } from "../../store/hooks";
import { loadUserActionCreator } from "../../store/features/userSlice/userSlice";

interface UseUser {
  loginUser: (userCredentials: UserCredentials) => Promise<void>;
}

const useUser = (): UseUser => {
  const dispatch = lingoDeckDispatch();

  const loginUser = async (userCredentials: UserCredentials) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL!}/user/login`,
      userCredentials
    );
    const { token } = response.data as TokenResponse;

    const { id, username } = decodeToken<LoginTokenPayload>(token);

    dispatch(loadUserActionCreator({ id, username, token }));
  };

  return { loginUser };
};

export default useUser;
