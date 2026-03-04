import request from "supertest";
import { prisma } from "@/libs/prisma";
import { app } from "@/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { makeAuthenticatedUserToTest } from "@/utils/tests/make-authenticated-user-to-test";
import { makeGymToTest } from "@/utils/tests/make-gyms-to-test";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await makeAuthenticatedUserToTest(app, true);

    const gym = await makeGymToTest(prisma);

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -29.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
