import { hash } from "bcryptjs";
import type { UserRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import type { Prisma } from "prisma/generated/prisma/client";
import { Role } from "prisma/generated/prisma/enums";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

interface RegisterUseCaseResponse {
  user: Prisma.UserCreateInput;
}

export class RegisterUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 10);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
      ...(role && { role }),
    });

    return { user };
  }
}
