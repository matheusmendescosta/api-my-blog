import { PrismaPostRepository } from '@/repositories/prisma/prisma-post-repository';
import { PostNotFound } from '@/services/errors/post-not-found';
import { PostSaveWhatsAppService } from '@/services/post/post-save-whatsapp-service';
import { Request, Response } from 'express';
import { z } from 'zod';

const routeSchema = z.object({
  postId: z.string(),
});

const bodySchema = z.object({
  phone: z.string(),
});

export const PostSaveWhatsAppController = async (request: Request, response: Response) => {
  try {
    const params = routeSchema.parse(request.params);
    const body = bodySchema.parse(request.body);

    const postSaveWhatsAppService = new PostSaveWhatsAppService(new PrismaPostRepository());
    await postSaveWhatsAppService.execute({ ...body, postId: params.postId });

    return response.status(200).json({ message: 'Post send to whatsapp' });
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
