import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository';
import { CreateCategoryService } from '@/services/category/create-category-service';
import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

const bodySchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export const CreateCategoryController = async (request: Request, response: Response) => {
  try {
    const body = bodySchema.parse(request.body);
    const createCategoryService = new CreateCategoryService(new PrismaCategoryRepository());
    const category = await createCategoryService.execute(body);

    return response.status(201).json({ category });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        error: 'validation error',
        details: error.errors,
      });
    }

    return response.status(500).json({ message: 'Internal server error' });
  }
};
