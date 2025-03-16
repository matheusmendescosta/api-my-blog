import { PrismaPostRepository } from '@/repositories/prisma/prisma-post-repository';
import { PostNotFound } from '@/services/errors/post-not-found';
import { PostSaveService } from '@/services/post/post-save-service';
import { Request, Response } from 'express';
import { z } from 'zod';

const routeSchema = z.object({
  postId: z.string(),
});

const bodySchema = z.object({
  email: z.string(),
});

export const PostSaveController = async (request: Request, response: Response) => {
  try {
    const params = routeSchema.parse(request.params);
    const body = bodySchema.parse(request.body);

    const postSaveService = new PostSaveService(new PrismaPostRepository());
    await postSaveService.execute({ ...body, postId: params.postId });

    return response.status(200).json({ message: 'Post send to email' });
  } catch (error) {
    if (error instanceof PostNotFound) {
      return response.status(404).json({
        message: error.message,
      });
    }
    console.log(error);
  }
  return response.status(500).json({ message: 'Internal server error' });
};
