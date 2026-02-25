import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserCheckInsMetricUseCase } from "../get-user-check-ins-metric";

export function makeGetUserCheckInsMetricUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserCheckInsMetricUseCase(checkInsRepository);

  return useCase;
}
