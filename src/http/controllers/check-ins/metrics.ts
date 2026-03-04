import type { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserCheckInsMetricUseCase } from "@/use-cases/factories/make-get-user-check-ins-metrics-use-case";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const metricsCheckInsUseCase = makeGetUserCheckInsMetricUseCase();

  const { checkInsCount } = await metricsCheckInsUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}
