import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create a gym", async () => {
    const gymData = {
      title: "JavaScript GYM LTDA",
      description: null,
      phone: null,
      latitude: -22.8123,
      longitude: -43.2123,
    };

    const { gym } = await sut.execute(gymData);

    await expect(gym.id).toEqual(expect.any(String));
  });
});
