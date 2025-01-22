import { describe, expect, test } from "vitest";
import { get, post } from "./hello";

describe("get", () => {
  test("should combine string with parameter value", async () => {
    const resp = await get({ name: "world" });
    expect(resp.message).toBe("Hello world!");
  });
});

describe("post", () => {
  test("should return posted data with reversed name", async () => {
    const data = { name: "my_dude", age: 20 };
    const resp = await post(data);
    expect(resp).toEqual({ name: "edud_ym", age: 20 });
  });
});