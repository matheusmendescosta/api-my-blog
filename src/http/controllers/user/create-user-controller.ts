import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { EmailAlreadyExists } from '@/services/errors/email-already-exists';
import { CreateUserService } from '@/services/user/user-create-service';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const bodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const CreateUserController = async (request: Request, response: Response) => {
  try {
    const body = bodySchema.parse(request.body);
    const createUserService = new CreateUserService(new PrismaUserRepository());
    const { user } = await createUserService.execute({ ...body });

    return response.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    if (error instanceof EmailAlreadyExists) {
      return response.status(409).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      return response.status(400).json({
        details: 'Validate error',
        error: error.errors,
      });
    }
  }

  return response.status(500).json({ error: 'Internal server error' });
};
