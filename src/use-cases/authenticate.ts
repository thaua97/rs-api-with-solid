import { compare } from 'bcryptjs';
import type { UserRepository } from '@/repositories/user-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUseCaseResponse {
	user: {
		id: string;
		email: string;
		name: string;
	};
}

export class AuthenticateUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatches = await compare(password, user.password_hash);
		

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError();
		}

		return {
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		};
	}
}
