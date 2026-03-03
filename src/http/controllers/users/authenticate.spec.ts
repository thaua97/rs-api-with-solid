import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

describe("Authentication (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    const registerResponse = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    if (registerResponse.statusCode !== 201) {
      console.log(
        "Register failed:",
        registerResponse.statusCode,
        registerResponse.body,
      );
    }

    const response = await request(app.server).post("/sessions").send({
      email: "john.doe@example.com",
      password: "123456",
    });

    if (response.statusCode !== 200) {
      console.log("Auth failed:", response.statusCode, response.body);
    }

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
