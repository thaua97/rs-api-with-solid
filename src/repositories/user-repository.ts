import type { Prisma } from 'prisma/generated/prisma/client';

export interface UserRepository {
	create(data: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput>;
	findByEmail(email: string): Promise<Prisma.UserCreateInput | null>;
}
