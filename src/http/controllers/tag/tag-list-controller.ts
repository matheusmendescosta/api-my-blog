import { PrismaTagRepository } from '@/repositories/prisma/prisma-tag-repository';
import { TagListService } from '@/services/tag/tag-list-service';
import { Request, Response } from 'express';
import { z } from 'zod';

const searchBodySchema = z.object({
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().min(1, 'Must have at least 1 item').max(100, 'must have less than 100 items').optional(),
});

const TagListController = async (request: Request, response: Response) => {
  try {
    const { offset, limit } = searchBodySchema.parse(request.query);

    const tagListService = new TagListService(new PrismaTagRepository());
    const tags = await tagListService.execute({
      offset,
      limit,
    });
    return response.status(200).json(tags);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};

export default TagListController;
