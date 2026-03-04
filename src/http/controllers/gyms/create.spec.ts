import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { makeAuthenticatedUserToTest } from "@/utils/tests/make-authenticated-user-to-test";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create gym", async () => {
    const { token } = await makeAuthenticatedUserToTest(app, true);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Gym 1",
        description: "Description 1",
        phone: "123456789",
        latitude: -23.55052,
        longitude: -46.63332,
      });
    expect(response.statusCode).toBe(201);
  });
});
