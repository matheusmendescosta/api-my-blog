import { Prisma, User } from '@prisma/client';

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<Omit<User, 'password'> | null>;
  findAll(
    offset?: number,
    limit?: number
  ): Promise<{
    totalCount: number;
    hasMore: boolean;
    offset: number;
    limit: number;
    users: Omit<User, 'password'>[];
  }>;
}
