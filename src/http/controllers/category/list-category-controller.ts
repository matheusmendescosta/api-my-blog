import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository';
import { CategoryListService } from '@/services/category/categoty-list-service';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const searchBodySchema = z.object({
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().min(1, 'Must have at least 1 item').max(100, 'must have less than 100 items').optional(),
});

export const ListCategoryController = async (request: Request, response: Response) => {
  try {
    const { offset, limit } = searchBodySchema.parse(request.query);

    const categoryListService = new CategoryListService(new PrismaCategoryRepository());
    const categories = await categoryListService.execute({ offset, limit });
    return response.status(200).json(categories);
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
