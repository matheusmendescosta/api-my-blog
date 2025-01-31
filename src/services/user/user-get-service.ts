import { UserRepository } from '@/repositories/user-repository';
import { Role } from '@prisma/client';

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

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
