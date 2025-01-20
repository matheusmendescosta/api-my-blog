import { PrismaPostRepository } from '@/repositories/prisma/prisma-post-repository';
import { PostGetService } from '@/services/post/post-get-service';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const routeSchema = z.object({
  id: z.string(),
});

const PostGetController = async (request: Request, response: Response) => {
  try {
    const params = routeSchema.parse(request.params);
    const postGetService = new PostGetService(new PrismaPostRepository());
    const post = await postGetService.execute({ id: params.id });

    return response.status(200).json(post.post);
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: 'Validation error',
        details: error.errors,
      });
    }
    return response.status(500).json({ message: 'Internal server error' });
  }
};

export default PostGetController;
