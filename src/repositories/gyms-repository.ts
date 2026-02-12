import type { Prisma, Gym } from "prisma/generated/prisma/client";

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>;
}
