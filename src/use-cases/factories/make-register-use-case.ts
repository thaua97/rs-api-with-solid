import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const userRepository = new InMemoryUsersRepository();
  const useCase = new RegisterUseCase(userRepository);

  return useCase;
}
