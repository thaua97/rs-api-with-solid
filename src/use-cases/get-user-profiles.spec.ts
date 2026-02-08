import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profiles";
import { ResourceNotExistError } from "./errors/resource-not-exist";

let userRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profiles Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(userRepository);
    });
    
    it('should be able to get user profile', async () => {
        const createdUser =await userRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password_hash: await hash('password123', 6),
        });
        
        const { user } = await sut.execute({
            userId: createdUser.id,
        });

        expect(user.name).toEqual('John Doe');
    });

    it('should not get user profile with wrong user id', async () => {
        await expect(() => sut.execute({
            userId: '1123131',
        })).rejects.toBeInstanceOf(ResourceNotExistError);
    });
});