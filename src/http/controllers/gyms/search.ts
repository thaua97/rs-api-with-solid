import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { MakeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymBodySchema.parse(request.body);

  try {
    const searchGymsUseCase = MakeSearchGymsUseCase();

    const { gyms } = await searchGymsUseCase.execute({
      query,
      page,
    });

    return reply.status(200).send({ gyms });
  } catch (error) {
    return reply.status(400).send({ error: "Gym could not be created" });
  }
}
