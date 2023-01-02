import { describe, it, expect } from "@jest/globals";
import request from "supertest";

import { app } from "../src/app";

describe("Testing Root Path", () => {
  it("Should return 200 and Hello World", async () => {
    const result = await request(app).get("/");

    expect(result.statusCode).toBe(200);
    expect(result.text).toBe("Hello World");
  });
});