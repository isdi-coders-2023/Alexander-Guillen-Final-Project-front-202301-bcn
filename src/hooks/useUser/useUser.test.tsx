import decodeToken from "jwt-decode";
import type * as NavigationModule from "@react-navigation/native";
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
import { renderHookWithStore } from "../../testsUtils/renders";

const mockNavigate = jest.fn();

jest.mock("jwt-decode", () => jest.fn());

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual<typeof NavigationModule>("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe("Given an useUser hooks", () => {
  const dispatchSpy = jest.spyOn(testStore, "dispatch");

  afterEach(() => {
    dispatchSpy.mockClear();
  });

  const setLoadingAction = setLoadingActionCreator();
  const unsetLoadingAction = unsetLoadingActionCreator();

  describe("When its inner function loginUser receives username 'Alexander' and password 'usuario1'", () => {
    test("Then it should call dispatch with setLoading, loadUser and unsetLoading actions, and redirect user to Home", async () => {
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

      await renderHookWithStore(
        useUser,
        testStore,
        "loginUser"
      )(userCredentials);

      expect(dispatchSpy.mock.calls).toStrictEqual(expectedCalledActions);
      expect(mockNavigate).toHaveBeenCalledWith("Home");
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

      await renderHookWithStore(
        useUser,
        testStore,
        "loginUser"
      )(wrongCredentials);

      expect(dispatchSpy.mock.calls).toStrictEqual(expectedCalledActions);
    });
  });
});
