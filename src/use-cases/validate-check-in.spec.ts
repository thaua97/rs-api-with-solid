import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotExistError } from "./errors/resource-not-exist";
import { LateCheckInValidationError } from "./errors/late-chack-in-validate-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate CheckIn Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate check-in", async () => {
    const checkInToValidate = await checkInsRepository.create({
      gym_id: "1",
      user_id: "user_id",
    });

    const { checkIn } = await sut.execute({
      checkInId: checkInToValidate.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0]?.validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate check-in that does not exist", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "non-existing-check-in-id",
      }),
    ).rejects.toThrowError(ResourceNotExistError);
  });

  it("should not be able to validate check-in more than 20 minutes after its creation", async () => {
    vi.setSystemTime(new Date(2026, 0, 1, 13, 40));

    const checkInToValidate = await checkInsRepository.create({
      gym_id: "1",
      user_id: "user_id",
    });

    const twentyOneMinutesInMs = 21 * 60 * 1000;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      sut.execute({
        checkInId: checkInToValidate.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
