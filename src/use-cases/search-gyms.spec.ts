import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);

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

  it("should be able to search gyms by title", async () => {
    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    await expect(gyms).toHaveLength(20);
  });

  it("should be able to search especified gym", async () => {
    const { gyms } = await sut.execute({
      query: "JavaScript GYM LTDA 3",
      page: 1,
    });

    await expect(gyms).toHaveLength(1);
    await expect(gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript GYM LTDA 3",
      }),
    ]);
  });
});
