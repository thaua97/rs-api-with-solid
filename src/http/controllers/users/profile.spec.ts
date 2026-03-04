import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { makeAuthenticatedUserToTest } from "@/utils/tests/make-authenticated-user-to-test";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get profile", async () => {
    const { token } = await makeAuthenticatedUserToTest(app);

    const response = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: "john.doe@example.com",
      }),
    );
  });
});
