import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { makeAuthenticatedUserToTest } from "@/utils/tests/make-authenticated-user-to-test";
import { makeManyGymsToTest } from "@/utils/tests/make-gyms-to-test";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able list nearby gyms", async () => {
    const { token } = await makeAuthenticatedUserToTest(app);

    await makeManyGymsToTest(app, token, 4);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some description.",
        phone: "1199999999",
        latitude: -27.0610928,
        longitude: -49.5229501,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -27.0610928,
        longitude: -49.5229501,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "TypeScript Gym",
      }),
    ]);
  });
});
