import type { FastifyInstance } from "fastify";
import request from "supertest";

export async function makeAuthenticatedUserToTest(app: FastifyInstance) {
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

  return { token };
}
