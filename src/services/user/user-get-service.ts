import { UserRepository } from '@/repositories/user-repository';
import { User } from '@prisma/client';

interface UserGetServiceRequest {
  id: string;
}

interface UserGetServiceResponse {
  user: User | null;
}

export class UserGetService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: UserGetServiceRequest): Promise<UserGetServiceResponse> {
    const user = await this.userRepository.findById(id);

    return { user };
  }
}
