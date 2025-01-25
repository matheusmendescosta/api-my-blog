import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { UserListService } from '@/services/user/user-list-service';
import { Request, Response } from 'express';
import { z } from 'zod';

const searchBodySchema = z.object({
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().min(1, 'Must have at least 1 item').max(100, 'must have less than 100 items').optional(),
});

const UserListController = async (request: Request, response: Response) => {
  try {
    const { offset, limit } = searchBodySchema.parse(request.query);

    const userListService = new UserListService(new PrismaUserRepository());
    const users = await userListService.execute({
      offset,
      limit,
    });

    return response.status(200).json({
      totalCount: users.users.totalCount,
      offset: users.users.offset,
      limit: users.users.limit,
      users: users.users.users,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};

export default UserListController;
