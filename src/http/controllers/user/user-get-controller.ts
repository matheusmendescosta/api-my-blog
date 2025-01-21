import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { UserGetService } from '@/services/user/user-get-service';
import { Request, Response } from 'express';
import { z } from 'zod';

const routeSchema = z.object({
  id: z.string(),
});

const UserGetController = async (request: Request, response: Response) => {
  try {
    const params = routeSchema.parse(request.params);
    const userGetService = new UserGetService(new PrismaUserRepository());

    const user = await userGetService.execute({ id: params.id });

    return response.status(200).json({
      id: user.user?.id,
      name: user.user?.name,
      email: user.user?.email,
      role: user.user?.role,
      createAt: user.user?.createdAt,
      updateAt: user.user?.updatedAt,
    });
  } catch (error) {
    console.log(error);

    return response.status(500).json({ message: 'Internal server error' });
  }
};

export default UserGetController;
