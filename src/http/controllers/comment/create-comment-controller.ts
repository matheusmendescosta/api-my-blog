import { PrismaCommentRepository } from '@/repositories/prisma/prisma-comment-repository';
import { CreateCommentService } from '@/services/comment/create-comment-repository';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const routeSchema = z.object({
  postId: z.string(),
});

const bodySchema = z.object({
  content: z.string(),
  userId: z.string().optional(),
  parentCommentId: z.string().optional(),
});

export const CreateCommentController = async (request: Request, response: Response) => {
  try {
    const body = bodySchema.parse(request.body);
    const params = routeSchema.parse(request.params);
    const createCommentService = new CreateCommentService(new PrismaCommentRepository());
    const { comment } = await createCommentService.execute({ ...body, postId: params.postId });

    return response.status(201).json({ comment });
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
