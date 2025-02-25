import { PrismaPostRepository } from '@/repositories/prisma/prisma-post-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { UserNotFound } from '@/services/errors/user-not-found';
import { CreatePostService } from '@/services/post/post-create-service';
import { PostStatus } from '@prisma/client';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const routeSchema = z.object({
  authorId: z.string(),
});

const bodySchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  status: z.nativeEnum(PostStatus),
  categoryId: z.string(),
  tags: z.array(z.string()),
});

export const PostCreateController = async (request: Request, response: Response) => {
  try {
    const params = routeSchema.parse(request.params);
    const body = bodySchema.parse(request.body);

    const createPostService = new CreatePostService(new PrismaPostRepository(), new PrismaUserRepository());
    const { post } = await createPostService.execute({ ...body, authorId: params.authorId });

    return response.status(201).json({ post });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }

    if (error instanceof UserNotFound) {
      return response.status(404).json({ message: error.message });
    }

    return response.status(500).json({ message: 'Internal server error' });
  }
};
