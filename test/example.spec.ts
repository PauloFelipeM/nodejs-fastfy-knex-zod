import { afterAll, beforeAll, expect, test } from "vitest";
import { app } from "../src/app";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test("Example of a test", () => {
  expect(1 + 1).toBe(2);
});
