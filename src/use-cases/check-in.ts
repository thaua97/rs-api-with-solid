import type { Prisma, CheckIn } from 'prisma/generated/prisma/client';
import type { CheckInsRepository } from '@/repositories/check-ins-respository';

interface CheckInUseCaseRequest {
	gymId: string;
	userId: string;
}

interface CheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class CheckInUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		userId,
		gymId,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId,
		});

		return { checkIn };
	}
}
