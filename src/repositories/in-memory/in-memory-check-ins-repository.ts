import type { Prisma, CheckIn } from 'prisma/generated/prisma/client';
import type { CheckInsRepository } from '../check-ins-respository';
import { randomUUID } from 'crypto';

export class InMemoryCheckInsRepository implements CheckInsRepository {
	public items: CheckIn[] = [];

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn: CheckIn = {
			id: randomUUID(),
			gym_id: data.gym_id,
			user_id: data.user_id,
			created_at: new Date(),
			validated_at: data.validated_at ? new Date(data.validated_at) : null,
		};

		this.items.push(checkIn);

		return checkIn;
	}
}
