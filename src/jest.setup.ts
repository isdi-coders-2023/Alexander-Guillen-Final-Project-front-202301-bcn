import "core-js";
import "@testing-library/jest-dom";
import "@testing-library/jest-native";
import "@testing-library/jest-native/extend-expect";
import server from "./mocks/server";

beforeAll(() => {
  global.setImmediate = jest.useRealTimers as unknown as typeof setImmediate;
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
