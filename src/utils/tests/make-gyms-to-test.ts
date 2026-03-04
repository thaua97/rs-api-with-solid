import type { FastifyInstance } from "fastify";
import request from "supertest";

export async function makeGymsToTest(
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
      console.log({ message: "Gym created" });
    } catch (error) {
      console.log({ message: error });
    }
  }
}
