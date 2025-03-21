import { PrismaTagRepository } from '@/repositories/prisma/prisma-tag-repository';
import { TagNotFound } from '@/services/errors/tag-not-found';
import { TagDeleteService } from '@/services/tag/tag-delete-service';
import { Request, Response } from 'express';
import { z } from 'zod';

const searchSchema = z.object({
  id: z.string(),
});

export const TagDeleteController = async (request: Request, response: Response) => {
  try {
    const { id } = searchSchema.parse(request.params);

    const serviceResponse = new TagDeleteService(new PrismaTagRepository());
    const { tag } = await serviceResponse.execute({ id });

    return response.status(200).json({ message: 'Tag deleted successfully', tag });
  } catch (error) {
    if (error instanceof TagNotFound) {
      return response.status(404).json({ error: error.message });
    }
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }
    console.log(error)
  }
  return response.status(500).json({ message: 'Internal server error' });
};
