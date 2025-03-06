import { PrismaLikeRepository } from '@/repositories/prisma/prisma-like-repository';
import { CreateLikeService } from '@/services/like/create-like-service';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const routeSchema = z.object({
  postId: z.string(),
});

const bodySchema = z.object({
  userId: z.string().optional(),
});

export const CreateLikeController = async (request: Request, response: Response) => {
  try {
    const params = routeSchema.parse(request.params);
    const body = bodySchema.parse(request.body);
    const userIp = request.ip; //take address ip user
    const createLikeService = new CreateLikeService(new PrismaLikeRepository());
    const like = await createLikeService.execute({ ...body, postId: params.postId });

    console.log(userIp); //take address ip user

    return response.status(201).json(like);
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }
    console.log(error);
  }
  return response.status(500).json({ message: 'Internal server error' });
};
