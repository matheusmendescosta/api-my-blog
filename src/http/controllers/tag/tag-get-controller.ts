import { PrismaTagRepository } from '@/repositories/prisma/prisma-tag-repository';
import { TagNotFound } from '@/services/errors/tag-not-found';
import { TagGetService } from '@/services/tag/tag-get-service';
import { Request, Response } from 'express';
import { z } from 'zod';

const ParamsSchema = z.object({
  id: z.string(),
});

export const TagGetController = async (request: Request, response: Response) => {
  try {
    const { id } = ParamsSchema.parse(request.params);
    const tagGetService = new TagGetService(new PrismaTagRepository());
    const { tag } = await tagGetService.execute({ id });

    return response.status(200).json({ tag });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }
    if (error instanceof TagNotFound) {
      return response.status(404).json({ message: error.message });
    }
    return response.status(400).json({ message: 'Bad Request' });
  }
};
