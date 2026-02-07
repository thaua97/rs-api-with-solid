import type { Prisma, User } from 'prisma/generated/prisma/client';

export interface UserRepository {
	create(data: Prisma.UserCreateInput): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
}
