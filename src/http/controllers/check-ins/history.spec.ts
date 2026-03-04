import request from "supertest";
import { prisma } from "@/libs/prisma";
import { app } from "@/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { makeAuthenticatedUserToTest } from "@/utils/tests/make-authenticated-user-to-test";
import { makeGymToTest } from "@/utils/tests/make-gyms-to-test";

describe("Check-ins History (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to list a check-ins history", async () => {
    const { token } = await makeAuthenticatedUserToTest(app, true);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await makeGymToTest(prisma);

    const checkInsMock = {
      gym_id: gym.id,
      user_id: user.id,
    };

    await prisma.checkIn.createMany({
      data: [checkInsMock, checkInsMock],
    });

    const response = await request(app.server)
      .get("/check-ins/history")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toHaveLength(2);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining(checkInsMock),
      expect.objectContaining(checkInsMock),
    ]);
  });
});
