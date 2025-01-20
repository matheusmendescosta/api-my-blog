import { PrismaPostRepository } from '@/repositories/prisma/prisma-post-repository';
import { ListPostService } from '@/services/post/post-list-service';
import { Request, Response } from 'express';
import { ZodError } from 'zod';

export const PostListController = async (request: Request, response: Response) => {
  try {
    const postListController = new ListPostService(new PrismaPostRepository());
    const { posts } = await postListController.execute({});
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
