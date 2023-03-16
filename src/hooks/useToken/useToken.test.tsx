import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook } from "@testing-library/react-native";
import decodeToken from "jwt-decode";
import { Provider } from "react-redux";
import useToken from "./useToken";
import { testStore, mockToken, tokenPayload } from "../../testsUtils/data";
import { loginUserActionCreator } from "../../store/features/userSlice/userSlice";
import { type User } from "../../types";

jest.mock("jwt-decode", () => jest.fn());

describe("Given a useToken hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("When getToken is called and there's a token in the storage", () => {
    test("Then it should call dispatch with loginUser action", async () => {
      AsyncStorage.getItem = jest.fn().mockReturnValue(mockToken);
      const user: User = {
        ...tokenPayload,
        token: mockToken,
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

  describe("When getToken is called there's not a token in the storage", () => {
    test("Then it shouldn't call dispatch", async () => {
      AsyncStorage.getItem = jest.fn().mockReturnValue(null);
      const dispatchSpy = jest.spyOn(testStore, "dispatch");
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

      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });
});
