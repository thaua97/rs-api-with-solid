import type { FastifyInstance } from "fastify";
import request from "supertest";
import { prisma } from "@/libs/prisma";
import { hash } from "bcryptjs";
import { Role } from "#/prisma/generated/prisma/enums";

export async function makeAuthenticatedUserToTest(
  app: FastifyInstance,
  isAdmin = false,
) {
  const email = "john.doe@example.com";

  await prisma.user.create({
    data: {
      name: "John Doe",
      email,
      password_hash: await hash("123456", 6),
      role: isAdmin ? Role.ADMIN : Role.MEMBER,
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email,
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
