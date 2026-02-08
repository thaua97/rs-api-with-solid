
import { compare } from 'bcryptjs';
import type { UserRepository } from '@/repositories/user-repository';
import { ResourceNotExistError } from './errors/resource-not-exist';

interface GetUserProfileUseCaseRequest {
	userId: string;
}

interface GetUserProfileUseCaseResponse {
	user: {
		id: string;
		email: string;
		name: string;
	};
}

export class GetUserProfileUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new ResourceNotExistError();
		}

		return {
			user,
		};
	}
}
