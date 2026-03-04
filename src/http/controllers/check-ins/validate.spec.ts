import request from "supertest";
import { prisma } from "@/libs/prisma";
import { app } from "@/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { makeAuthenticatedUserToTest } from "@/utils/tests/make-authenticated-user-to-test";
import { makeGymToTest } from "@/utils/tests/make-gyms-to-test";

describe("Validate Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate a check-in", async () => {
    const { token } = await makeAuthenticatedUserToTest(app, true);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await makeGymToTest(prisma);

    const checkInsMock = {
      gym_id: gym.id,
      user_id: user.id,
    };

    let checkInToValidate = await prisma.checkIn.create({
      data: checkInsMock,
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkInToValidate.id}/validate`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(204);

    checkInToValidate = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkInToValidate.id,
      },
    });

    expect(checkInToValidate.validated_at).toEqual(expect.any(Date));
  });
});
