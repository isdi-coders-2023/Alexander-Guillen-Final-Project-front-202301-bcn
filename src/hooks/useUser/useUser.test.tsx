import React from "react";
import decodeToken from "jwt-decode";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../store/store";
import useUser from "./useUser";
import { type LoginTokenPayload, type UserCredentials } from "../../types";
import { loadUserActionCreator } from "../../store/features/userSlice/userSlice";

jest.mock("jwt-decode", () => jest.fn());

describe("Given an useUser hooks", () => {
  describe("When its inner function loginUser receives username 'Alexander' and password 'usuario1'", () => {
    test("Then it should call dispatch with loadUser action", async () => {
      const tokenPayload: LoginTokenPayload = {
        username: "Alexander",
        id: "6409d298f5c4e943969fc56f",
      };
      const userCredentials: UserCredentials = {
        username: "Alexander",
        password: "usuario1",
      };
      const loadUserAction = loadUserActionCreator({
        ...tokenPayload,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      });

      const testStore = setupStore();
      const dispatchSpy = jest.spyOn(testStore, "dispatch");
      (decodeToken as jest.MockedFunction<typeof decodeToken>).mockReturnValue(
        tokenPayload
      );
      const {
        result: {
          current: { loginUser },
        },
      } = renderHook(() => useUser(), {
        wrapper({ children }) {
          return <Provider store={testStore}>{children}</Provider>;
        },
      });

      await loginUser(userCredentials);

      expect(dispatchSpy.mock.calls[0][0]).toStrictEqual(loadUserAction);
    });
  });
});
