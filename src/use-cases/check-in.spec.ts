import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("CheckIn Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.create({
      title: "Gym 01",
      latitude: -22.8123,
      longitude: -43.2123,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const gymId = gymsRepository?.items[0]?.id!;
    const { checkIn } = await sut.execute({
      gymId,
      userId: "user_id",
      userLatitude: -22.8123,
      userLongitude: -43.2123,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 1, 20, 8, 0, 0));

    const gymId = gymsRepository?.items[0]?.id!;

    await sut.execute({
      gymId,
      userId: "user_id",
      userLatitude: -22.8123,
      userLongitude: -43.2123,
    });

    await expect(() =>
      sut.execute({
        gymId,
        userId: "user_id",
        userLatitude: -22.8123,
        userLongitude: -43.2123,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check-in in twice but in different days", async () => {
    vi.setSystemTime(new Date(2025, 1, 20, 8, 0, 0));

    const gymId = gymsRepository?.items[0]?.id!;

    await sut.execute({
      gymId,
      userId: "user_id",
      userLatitude: -22.8123,
      userLongitude: -43.2123,
    });

    vi.setSystemTime(new Date(2025, 1, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId,
      userId: "user_id",
      userLatitude: -22.8123,
      userLongitude: -43.2123,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
