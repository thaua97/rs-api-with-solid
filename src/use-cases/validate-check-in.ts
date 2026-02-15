import type { CheckIn } from "prisma/generated/prisma/client";
import type { CheckInsRepository } from "@/repositories/check-ins-respository";
import { ResourceNotExistError } from "./errors/resource-not-exist";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-chack-in-validate-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotExistError();
    }

    const distanceInMinutesFromCheckInCreated = dayjs(new Date()).diff(
      checkIn.created_at,
      "minute",
    );

    if (distanceInMinutesFromCheckInCreated > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.update(checkIn);

    return { checkIn };
  }
}
