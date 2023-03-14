import { useCallback } from "react";
import decodeToken from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { type LoginTokenPayload } from "../../types";
import { lingoDeckDispatch } from "../../store/hooks";
import { loginUserActionCreator } from "../../store/features/userSlice/userSlice";

const useToken = () => {
  const dispatch = lingoDeckDispatch();

  const getToken = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const { username, id } = decodeToken<LoginTokenPayload>(token);
      dispatch(loginUserActionCreator({ id, username, token }));
    }
  }, [dispatch]);

  return { getToken };
};

export default useToken;
