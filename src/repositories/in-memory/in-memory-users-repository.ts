import type { Prisma } from 'prisma/generated/prisma/client';
import type { UserRepository } from '../user-repository';

export class InMemoryUsersRepository implements UserRepository {
	public items: Prisma.UserCreateInput[] = [];

	async findByEmail(email: string) {
		const user = this.items.find((item) => item.email === email);

		return user as Prisma.UserCreateInput | null;
	}

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: '1',
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
		};

		this.items.push(user);

		return user;
	}
}
