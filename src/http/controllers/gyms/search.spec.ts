import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { makeAuthenticatedUserToTest } from "@/utils/tests/make-authenticated-user-to-test";
import { makeGymsToTest } from "@/utils/tests/make-gyms-to-test";

describe("Search Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gym", async () => {
    const { token } = await makeAuthenticatedUserToTest(app);

    await makeGymsToTest(app, token, 2);

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "Gym 1",
        page: 1,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Gym 1",
      }),
    ]);
  });
});
