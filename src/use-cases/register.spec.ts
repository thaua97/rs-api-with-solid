import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('Register Use Case', () => {
	it('should be able to register', async () => {
		const userRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(userRepository);

		const registerData = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password1234',
		};

		const { user } = await registerUseCase.execute(registerData);

		await expect(user.id).toEqual(expect.any(String));
	});

	it('should hash user password upon registration', async () => {
		const userRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(userRepository);

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
		const userRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(userRepository);

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
