import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }
}
