import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gym-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymBodySchema.parse(request.body);

  try {
    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    });

    return reply.status(200).send({ gyms });
  } catch (error) {
    return reply.status(400).send({ error: "Gyms could not be fetched" });
  }
}
