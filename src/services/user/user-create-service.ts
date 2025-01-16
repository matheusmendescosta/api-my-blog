import { UserRepository } from '@/repositories/user-repository';
import { Role, User } from '@prisma/client';
import { hash } from 'bcryptjs';

interface CreateUserServiceRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface CreateUserServiceResponse {
  user: User;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password, role }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const passwordHash = await hash(password, 6);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      role,
    });

    return { user };
  }
}
