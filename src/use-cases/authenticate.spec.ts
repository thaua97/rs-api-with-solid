import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let userRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(userRepository);
    });
    
    it('should authenticate a user', async () => {
        await userRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password_hash: await hash('password123', 6),
        });
        
        const { user } = await sut.execute({
            email: 'john.doe@example.com',
            password: 'password123',
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should not authenticate a user with wrong email', async () => {
        expect(() => sut.execute({
            email: 'john.doe@example.com',
            password: 'password122',
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not authenticate a user with wrong password', async () => {
        await userRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password_hash: await hash('password123', 6),
        });

        expect(() => sut.execute({
            email: 'john.doe@example.com',
            password: 'password122',
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});