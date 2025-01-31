import { PrismaPostRepository } from '@/repositories/prisma/prisma-post-repository';
import { ListPostService } from '@/services/post/post-list-service';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const searchBodySchema = z.object({
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().min(1, 'Must have at least 1 item').max(100, 'must have less than 100 items').optional(),
});

export const PostListController = async (request: Request, response: Response) => {
  try {
    const { offset, limit } = searchBodySchema.parse(request.query);

    const postListController = new ListPostService(new PrismaPostRepository());
    const { posts } = await postListController.execute({
      offset,
      limit,
    });
    return response.status(200).json(posts);
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: 'Validation error',
        details: error.errors,
      });
    }
  }

  return response.status(500).json({ message: 'Internal server error' });
};
