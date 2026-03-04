import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymQuerySchema.parse(request.query);

  try {
    const searchGymsUseCase = makeSearchGymsUseCase();

    const { gyms } = await searchGymsUseCase.execute({
      query,
      page,
    });

    return reply.status(200).send({ gyms });
  } catch (error) {
    return reply.status(400).send({ error: "Gym could not be created" });
  }
}
