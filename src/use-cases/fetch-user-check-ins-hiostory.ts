import type { CheckIn } from "prisma/generated/prisma/client";
import type { CheckInsRepository } from "@/repositories/check-ins-respository";
import { ResourceNotExistError } from "./errors/resource-not-exist";

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    if (!checkIns) {
      throw new ResourceNotExistError();
    }

    return { checkIns };
  }
}
