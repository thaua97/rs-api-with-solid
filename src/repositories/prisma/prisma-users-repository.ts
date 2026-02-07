import { prisma } from '@/libs/prisma';
import type { Prisma } from 'prisma/generated/prisma/client';
import type { UserRepository } from '../user-repository';

export class PrismaUsersRepository implements UserRepository {
	async create(data: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput> {
		return await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password_hash: data.password_hash,
			},
		});
	}

	async findByEmail(email: string) {
		try {
			return await prisma.user.findUnique({
				where: {
					email,
				},
			});
		} catch (error) {
			throw new Error('User with this email already exists');
		}
	}
}
