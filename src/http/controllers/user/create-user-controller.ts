import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { CreateUserService } from '@/services/user/create-user-service';
import { Role } from '@prisma/client';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.nativeEnum(Role),
});

export const CreateUserController = async (request: Request, response: Response) => {
  try {
    const body = bodySchema.parse(request.body);
    const createUserService = new CreateUserService(new PrismaUserRepository());
    const { user } = await createUserService.execute(body);

    return response.status(201).json({ user });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }

    return response.status(500).json({ error: 'Internal server error' });
  }
};
