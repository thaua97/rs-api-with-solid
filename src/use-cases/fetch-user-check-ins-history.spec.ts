import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchUserCheckInHistoryUseCase } from "./fetch-user-check-ins-hiostory";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: FetchUserCheckInHistoryUseCase;

describe("Fetch User CheckIns History Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchUserCheckInHistoryUseCase(checkInsRepository);
  });

  it("should be able to fetch user check-ins history", async () => {
    await checkInsRepository.create({
      gym_id: "gym_01",
      user_id: "user_01",
    });

    await checkInsRepository.create({
      gym_id: "gym_02",
      user_id: "user_01",
    });

    const { checkIns } = await sut.execute({
      userId: "user_01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym_01" }),
      expect.objectContaining({ gym_id: "gym_02" }),
    ]);
  });

  it("should be able to fetch paginated user check-ins history", async () => {
    for (let i = 0; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym_${i + 1}`,
        user_id: "user_01",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user_01",
      page: 2,
    });

    expect(checkIns).toHaveLength(3);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym_21" }),
      expect.objectContaining({ gym_id: "gym_22" }),
      expect.objectContaining({ gym_id: "gym_23" }),
    ]);
  });
});
