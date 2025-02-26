import { PrismaPostRepository } from '@/repositories/prisma/prisma-post-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { Forbidden } from '@/services/errors/forbidden';
import { PostNotFound } from '@/services/errors/post-not-found';
import { UserNotFound } from '@/services/errors/user-not-found';
import { PostEditService } from '@/services/post/post-edit-service';
import { PostStatus } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';

const routeSchema = z.object({
  postId: z.string(),
});

const bodySchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  status: z.nativeEnum(PostStatus),
  categoryId: z.string(),
  tags: z.array(z.string()),
  authorId: z.string(),
});

export const PostEditController = async (request: Request, response: Response) => {
  try {
    const params = routeSchema.parse(request.params);
    const body = bodySchema.parse(request.body);

    const postEditService = new PostEditService(new PrismaUserRepository(), new PrismaPostRepository());
    const { updatePost } = await postEditService.execute({ ...body, postId: params.postId });

    return response.status(200).json({ post: updatePost });
  } catch (error) {
    if (error instanceof UserNotFound) {
      return response.status(404).json({ message: error.message });
    }

    if (error instanceof PostNotFound) {
      return response.status(404).json({ message: error.message });
    }

    if (error instanceof Forbidden) {
      return response.status(403).json({ message: error.message });
    }

    if (error instanceof z.ZodError) {
      return response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }

    console.log(error);
  }
  return response.status(500).json({ message: 'Internal server error' });
};
