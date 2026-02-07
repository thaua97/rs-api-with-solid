import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
    const userRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(userRepository);
    return registerUseCase;
}