import "@fastify/jwt";
import { Role } from "#/prisma/generated/prisma/enums";
declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string;
      role: Role;
    };
  }
}
