import "core-js";
import "@testing-library/jest-dom";
import "@testing-library/jest-native";
import "@testing-library/jest-native/extend-expect";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import server from "./mocks/server";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
