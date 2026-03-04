import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInsHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInsHistoryBodySchema.parse(request.query);

  try {
    const fetchCheckInsHistorUseCase = makeFetchUserCheckInsHistoryUseCase();

    const { checkIns } = await fetchCheckInsHistorUseCase.execute({
      page,
      userId: request.user.sub,
    });

    return reply.status(200).send({ checkIns });
  } catch (error) {
    return reply.status(400).send({ error: "Gym could not be created" });
  }
}
