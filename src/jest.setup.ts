import "@testing-library/jest-dom";
import "@testing-library/jest-native/extend-expect";
import server from "./mocks/server";

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
