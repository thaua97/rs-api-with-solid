import type { PrismaClient } from "@prisma/client/extension";
import type { FastifyInstance } from "fastify";
import request from "supertest";

export async function makeManyGymsToTest(
  app: FastifyInstance,
  token: string,
  fould: number,
) {
  for (let i = 0; i < fould; i++) {
    try {
      await request(app.server)
        .post("/gyms")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: `Gym ${i + 1}`,
          description: "Description 1",
          phone: "123456789",
          latitude: -23.55052,
          longitude: -46.63332,
        });
    } catch (error) {
      console.log({ message: error });
    }
  }
}

export async function makeGymToTest(prisma: PrismaClient) {
  const gym = await prisma.gym.create({
    data: {
      title: "ONCE GYM",
      latitude: -29.2092052,
      longitude: -49.6401091,
    },
  });

  return gym;
}
