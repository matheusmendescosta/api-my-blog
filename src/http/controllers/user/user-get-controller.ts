import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { UserNotFound } from '@/services/errors/user-not-found';
import { UserGetService } from '@/services/user/user-get-service';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const routeSchema = z.object({
  id: z.string(),
});

const UserGetController = async (request: Request, response: Response) => {
  try {
    const params = routeSchema.parse(request.params);
    const userGetService = new UserGetService(new PrismaUserRepository());

    const user = await userGetService.execute({ id: params.id });

    return response.status(200).json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: 'Validation error',
        details: error.errors,
      });
    }

    if (error instanceof UserNotFound) {
      return response.status(404).json({ message: error.message });
    }
  }
  return response.status(500).json({ message: 'Internal server error' });
};

export default UserGetController;
