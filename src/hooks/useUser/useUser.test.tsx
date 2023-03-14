import React from "react";
import decodeToken from "jwt-decode";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import useUser from "./useUser";
import { loginUserActionCreator } from "../../store/features/userSlice/userSlice";
import { testStore } from "../../testsUtils/data";
import { tokenPayload } from "../../testsUtils/data";
import { userCredentials } from "../../testsUtils/data";
import { type ModalPayload, type UserCredentials } from "../../types";
import {
  openModalActionCreator,
  setLoadingActionCreator,
  unsetLoadingActionCreator,
} from "../../store/features/uiSlice/uiSlice";

jest.mock("jwt-decode", () => jest.fn());

describe("Given an useUser hooks", () => {
  const dispatchSpy = jest.spyOn(testStore, "dispatch");

  afterEach(() => {
    dispatchSpy.mockClear();
  });

  const setLoadingAction = setLoadingActionCreator();
  const unsetLoadingAction = unsetLoadingActionCreator();

  describe("When its inner function loginUser receives username 'Alexander' and password 'usuario1'", () => {
    test("Then it should call dispatch with setLoading, loadUser and unsetLoading actions", async () => {
      const setLoadingAction = setLoadingActionCreator();
      const loadUserAction = loginUserActionCreator({
        ...tokenPayload,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      });
      const unsetLoadingAction = unsetLoadingActionCreator();
      const expectedCalledActions = [
        [setLoadingAction],
        [loadUserAction],
        [unsetLoadingAction],
      ];

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

      expect(dispatchSpy.mock.calls).toStrictEqual(expectedCalledActions);
    });
  });

  describe("When its inner function loginUser receives username 'Alexander' and password 'usuario2'", () => {
    test("Then it should call dispatch with setLoading, unsetLoading and openModal action with Wrong credentials error", async () => {
      const wrongCredentials: UserCredentials = {
        username: "Alexander",
        password: "usuario2",
      };
      const wrongCredentialsError: ModalPayload = {
        title: "Wrong credentials",
        message: "Password or username were incorrect",
        isError: true,
      };
      const openModalAction = openModalActionCreator(wrongCredentialsError);
      const expectedCalledActions = [
        [setLoadingAction],
        [unsetLoadingAction],
        [openModalAction],
      ];

      const {
        result: {
          current: { loginUser },
        },
      } = renderHook(() => useUser(), {
        wrapper({ children }) {
          return <Provider store={testStore}>{children}</Provider>;
        },
      });

      await loginUser(wrongCredentials);

      expect(dispatchSpy.mock.calls).toStrictEqual(expectedCalledActions);
    });
  });
});
