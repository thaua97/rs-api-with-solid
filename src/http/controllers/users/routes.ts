import type { FastifyInstance } from "fastify";
// middlewares
import { verifyJWT } from "@/http/middlewares/verify-jwt";
// controllers
import { register } from "@/http/controllers/users/register";
import { authenticate } from "@/http/controllers/users/authenticate";
import { profile } from "@/http/controllers/users/profile";
import { refresh } from "@/http/controllers/users/refresh";

export async function usersRoutes(app: FastifyInstance) {
  // User
  app.post("/users", register);
  app.post("/sessions", authenticate);
  // refresh token
  app.patch("/token/refresh", refresh);
  // Authenticated
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
