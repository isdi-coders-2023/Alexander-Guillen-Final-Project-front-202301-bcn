import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook } from "@testing-library/react-native";
import decodeToken from "jwt-decode";
import { Provider } from "react-redux";
import useToken from "./useToken";
import { testStore, token, tokenPayload } from "../../testsUtils/data";
import { loginUserActionCreator } from "../../store/features/userSlice/userSlice";
import { type User } from "../../types";

jest.mock("jwt-decode", () => jest.fn());

AsyncStorage.getItem = jest.fn().mockReturnValue(token);

describe("Given a useToken hook", () => {
  describe("When getToken is called", () => {
    test("Then it should call dispatch with loginUser action", async () => {
      const user: User = {
        ...tokenPayload,
        token,
      };
      const loginUserAction = loginUserActionCreator(user);
      const dispatchSpy = jest.spyOn(testStore, "dispatch");
      (decodeToken as jest.MockedFunction<typeof decodeToken>).mockReturnValue(
        tokenPayload
      );

      const {
        result: {
          current: { getToken },
        },
      } = renderHook(() => useToken(), {
        wrapper({ children }) {
          return <Provider store={testStore}>{children}</Provider>;
        },
      });

      await getToken();

      expect(dispatchSpy.mock.calls[0][0]).toStrictEqual(loginUserAction);
    });
  });
});
