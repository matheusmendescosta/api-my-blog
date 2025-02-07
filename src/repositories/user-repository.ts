import { Prisma, Role, User } from '@prisma/client';

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<{ name: string; id: string; email: string; role: Role; createdAt: Date; updatedAt: Date } | null>;
  findAll(
    offset?: number,
    limit?: number,
  ): Promise<{
    totalCount: number;
    hasMore: boolean;
    offset: number;
    limit: number;
    users: Omit<User, 'password'>[];
  }>;
  updateUserPermission(
    id: string,
    data: Prisma.UserUpdateInput
  ): Promise<{ name: string; id: string; email: string; role: Role; createdAt: Date; updatedAt: Date } | null>;
}
