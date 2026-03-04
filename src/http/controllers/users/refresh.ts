import type { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const { role } = request.user;

  try {
    const token = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub: request.user.sub,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      { role },
      {
        sign: {
          sub: request.user.sub,
          expiresIn: "7d",
        },
      },
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ error: "Invalid credentials" });
    }

    throw error;
  }
}
