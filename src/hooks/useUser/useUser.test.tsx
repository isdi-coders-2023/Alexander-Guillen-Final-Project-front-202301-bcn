import React from "react";
import decodeToken from "jwt-decode";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import useUser from "./useUser";
import { loginUserActionCreator } from "../../store/features/userSlice/userSlice";
import { testStore } from "../../testsUtils/data";
import { tokenPayload } from "../../testsUtils/data";
import { userCredentials } from "../../testsUtils/data";

jest.mock("jwt-decode", () => jest.fn());

describe("Given an useUser hooks", () => {
  describe("When its inner function loginUser receives username 'Alexander' and password 'usuario1'", () => {
    test("Then it should call dispatch with loadUser action", async () => {
      const loadUserAction = loginUserActionCreator({
        ...tokenPayload,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      });

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
