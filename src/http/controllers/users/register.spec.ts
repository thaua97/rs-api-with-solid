import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    if (response.statusCode !== 201) {
      console.log("Register failed:", response.statusCode, response.body);
    }

    expect(response.statusCode).toBe(201);
  });
});
