import { prisma } from "@/libs/prisma";
import type {
  FindManyNearbyParams,
  GymsRepository,
} from "@/repositories/gyms-repository";
import { ResourceNotExistError } from "@/use-cases/errors/resource-not-exist";
import type { Gym } from "prisma/generated/prisma/client";
import type { GymUncheckedCreateInput } from "prisma/generated/prisma/models";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    if (!gym) {
      throw new ResourceNotExistError();
    }

    return gym;
  }

  async findManyNearby({
    userLatitude,
    userLongitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * FROM gyms
        WHERE (6371 * acos( cos( radians(${userLatitude})) * cos(radians(gym.latitude)) * cos(
        radians(gym.longitude) - radians(${userLongitude})) + sin(radians(${userLatitude})) * sin(
        radians(gym.latitude))
        )) <= 10`;

    return gyms;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async create(data: GymUncheckedCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }
}
