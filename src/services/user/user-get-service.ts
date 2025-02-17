import { UserRepository } from '@/repositories/user-repository';
import { Role } from '@prisma/client';
import { UserNotFound } from '../errors/user-not-found';

interface UserGetServiceRequest {
  id: string;
}

interface UserGetServiceResponse {
  name: string;
  id: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export class UserGetService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: UserGetServiceRequest): Promise<UserGetServiceResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new UserNotFound();

    return user;
  }
}
