import AsyncStorage from "@react-native-async-storage/async-storage";
import decodeToken from "jwt-decode";
import useToken from "./useToken";
import { testStore, mockToken, tokenPayload } from "../../testsUtils/data";
import { loginUserActionCreator } from "../../store/features/userSlice/userSlice";
import { type User } from "../../types";
import { renderHookWithStore } from "../../testsUtils/renders";

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

      await renderHookWithStore(useToken, testStore, "getToken")();

      expect(dispatchSpy.mock.calls[0][0]).toStrictEqual(loginUserAction);
    });
  });

  describe("When getToken is called there's not a token in the storage", () => {
    test("Then it shouldn't call dispatch", async () => {
      AsyncStorage.getItem = jest.fn().mockReturnValue(null);
      const dispatchSpy = jest.spyOn(testStore, "dispatch");

      await renderHookWithStore(useToken, testStore, "getToken")();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });
});
