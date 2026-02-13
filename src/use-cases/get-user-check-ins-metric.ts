import type { CheckIn } from "prisma/generated/prisma/client";
import type { CheckInsRepository } from "@/repositories/check-ins-respository";
import { ResourceNotExistError } from "./errors/resource-not-exist";

interface GetUserCheckInsMetricUseCaseRequest {
  userId: string;
}

interface GetUserCheckInsMetricUseCaseResponse {
  checkInsCount: number;
}

export class GetUserCheckInsMetricUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserCheckInsMetricUseCaseRequest): Promise<GetUserCheckInsMetricUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    if (!checkInsCount) {
      throw new ResourceNotExistError();
    }

    return { checkInsCount };
  }
}
