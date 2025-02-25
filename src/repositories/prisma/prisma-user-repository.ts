import { prisma } from '@/lib/prisma';
import { Prisma, Role, User } from '@prisma/client';
import { UserRepository } from '../user-repository';

export class PrismaUserRepository implements UserRepository {
  async updateUserPermission(
    id: string,
    data: Prisma.UserUpdateInput,
  ): Promise<{ name: string; id: string; email: string; role: Role; createdAt: Date; updatedAt: Date } | null> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async findAll(
    offset: number = 1,
    limit: number = 25,
  ): Promise<{ totalCount: number; hasMore: boolean; offset: number; limit: number; users: Omit<User, 'password'>[] }> {
    const count = await prisma.user.count();

    const users = await prisma.user.findMany({
      take: limit,
      skip: (offset - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });

    const totalPages = Math.ceil(count / limit);

    const hasMore = offset < totalPages;

    return { totalCount: count, hasMore, offset, limit, users };
  }

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        posts: true,
        comments: true,
        likes: true,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }
}
