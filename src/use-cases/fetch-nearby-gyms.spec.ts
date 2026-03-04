import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);

    for (let i = 0; i < 22; i++) {
      await gymsRepository.create({
        title: `JavaScript GYM LTDA ${i + 1}`,
        description: null,
        phone: null,
        latitude: -22.8123,
        longitude: -43.2123,
      });
    }
  });

  it("should be able to fetch nearby gyms", async () => {
    const { gyms } = await sut.execute({
      latitude: -22.8123,
      longitude: -43.2123,
    });

    await expect(gyms).toHaveLength(22);
  });

  it("should be able to fetch nearby gym", async () => {
    await gymsRepository.create({
      title: `Tech GYM LTDA`,
      description: null,
      phone: null,
      latitude: -24.8123,
      longitude: -24.8123,
    });

    const { gyms } = await sut.execute({
      latitude: -24.8123,
      longitude: -24.8123,
    });

    await expect(gyms).toHaveLength(1);
    await expect(gyms).toEqual([
      expect.objectContaining({
        title: "Tech GYM LTDA",
      }),
    ]);
  });
});
