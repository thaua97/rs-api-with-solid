import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-ins-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  try {
    const validateCheckInUseCase = makeValidateCheckInUseCase();

    await validateCheckInUseCase.execute({
      checkInId,
    });

    return reply.status(204).send();
  } catch (error) {
    return reply.status(400).send({ error: "Check-in could not be validated" });
  }
}
