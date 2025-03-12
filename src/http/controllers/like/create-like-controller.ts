import { PrismaLikeRepository } from '@/repositories/prisma/prisma-like-repository';
import { IpAlreadyLiked } from '@/services/errors/ip-already-liked';
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
    const forwarded = request.headers['x-forwarded-for'] as string;
    const userIp = forwarded ? forwarded.split(',')[0].trim() : request.ip;

    const createLikeService = new CreateLikeService(new PrismaLikeRepository());
    const like = await createLikeService.execute({ ...body, postId: params.postId, ip: userIp || '' });
    return response.status(201).json(like);
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }
    if (error instanceof IpAlreadyLiked) {
      return response.status(403).json({ message: error.message });
    }
    console.log(error);
  }
  return response.status(500).json({ message: 'Internal server error' });
};
