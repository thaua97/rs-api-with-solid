import type { Role } from "#/prisma/generated/prisma/enums";
import type { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleVerify: Role) {
  return (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleVerify) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  };
}
