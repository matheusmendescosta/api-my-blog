import { PrismaTagRepository } from '@/repositories/prisma/prisma-tag-repository';
import { CreateTagService } from '@/services/tag/create-tag-service';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const bodySchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export const CreateTagController = async (request: Request, response: Response) => {
  try {
    const body = bodySchema.parse(request.body);
    const createTagController = new CreateTagService(new PrismaTagRepository());
    const { tag } = await createTagController.execute(body);

    return response.status(201).json(tag);
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};
