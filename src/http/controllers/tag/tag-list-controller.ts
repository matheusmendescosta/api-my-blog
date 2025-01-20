import { PrismaTagRepository } from '@/repositories/prisma/prisma-tag-repository';
import { TagListService } from '@/services/tag/tag-list-service';
import { Request, Response } from 'express';

const TagListController = async (request: Request, response: Response) => {
  try {
    const tagListService = new TagListService(new PrismaTagRepository());
    const tags = await tagListService.execute({});
    return response.status(200).json(tags);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};

export default TagListController;
