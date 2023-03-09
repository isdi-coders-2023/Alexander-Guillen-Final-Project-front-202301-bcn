import { type User, type UserState } from "../../../types";
import { loadUserActionCreator, userReducer } from "./userSlice";

describe("Given an userReducer", () => {
  describe("When it receives loadUser action that has received an id '1', username 'Alexander', token 'yG!UyPP5aQ3HiLGSVUCdg', and an empty state", () => {
    test("Then it should return new state with those values and changed login status to true", () => {
      const currentUserState: UserState = {
        id: "",
        token: "",
        username: "",
        isLogged: false,
      };
      const userPayload: User = {
        username: "Alexander",
        id: "1",
        token: "yG!UyPP5aQ3HiLGSVUCdg",
      };
      const expectedNewUserState: UserState = {
        ...userPayload,
        isLogged: true,
      };

      const loadUserAction = loadUserActionCreator(userPayload);

      const newUserState = userReducer(currentUserState, loadUserAction);

      expect(newUserState).toStrictEqual(expectedNewUserState);
    });
  });
});
