import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get profile", async () => {
    const email = "john.doe@example.com";

    await request(app.server).post("/users").send({
      name: "John Doe",
      email,
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email,
      password: "123456",
    });

    const { token } = authResponse.body;

    const response = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email,
      }),
    );
  });
});
