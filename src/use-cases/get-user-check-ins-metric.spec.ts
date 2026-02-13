import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { GetUserCheckInsMetricUseCase } from "./get-user-check-ins-metric";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: GetUserCheckInsMetricUseCase;

describe("Get User CheckIns Metrick Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new GetUserCheckInsMetricUseCase(checkInsRepository);
  });

  it("should be able to get user check-ins count metrics", async () => {
    for (let i = 0; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym_${i + 1}`,
        user_id: "user_01",
      });
    }

    const { checkInsCount } = await sut.execute({
      userId: "user_01",
    });

    expect(checkInsCount).toEqual(23);
  });
});
