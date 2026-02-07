import { describe, expect, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let userRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe('Register Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUsersRepository();
		registerUseCase = new RegisterUseCase(userRepository);
	});
	
	it('should be able to register', async () => {
		const registerData = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password1234',
		};

		const { user } = await registerUseCase.execute(registerData);

		await expect(user.id).toEqual(expect.any(String));
	});

	it('should hash user password upon registration', async () => {	
		const password = 'password1234';

		const { user } = await registerUseCase.execute({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password,
		});

		const isPasswordCorrectyHashed = await compare(
			password,
			user.password_hash,
		);

		await expect(isPasswordCorrectyHashed).toBe(true);
	});

	it('should not be able to register with same email twice', async () => {
		const password = 'password1234';
		const user = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			password,
		};

		await registerUseCase.execute(user);

		await expect(() => registerUseCase.execute(user)).rejects.toBeInstanceOf(
			UserAlreadyExistsError,
		);
	});
});
