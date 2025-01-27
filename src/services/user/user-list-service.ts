import { UserRepository } from '@/repositories/user-repository';
import { User } from '@prisma/client';

interface UserListServiceRequest {
  offset?: number;
  limit?: number;
}

interface UserListServiceResponse {
  users: {
    totalCount: number;
    offset: number;
    limit: number;
    hasMore: boolean;
    users: Omit<User, 'password'>[];
  };
}

export class UserListService {
  constructor(private userRepository: UserRepository) {}

  async execute({ offset, limit }: UserListServiceRequest): Promise<UserListServiceResponse> {
    const users = await this.userRepository.findAll(offset, limit);

    return { users };
  }
}
