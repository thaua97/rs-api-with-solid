import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { Role } from "#/prisma/generated/prisma/enums";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "MEMBER"]).optional(),
  });

  const { name, email, password, role } = registerBodySchema.parse(
    request.body,
  );

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
      ...(role && { role: role as Role }),
    });
    return reply.status(201).send();
  } catch (error) {
    return reply.status(400).send({ error: "User could not be created" });
  }
}
