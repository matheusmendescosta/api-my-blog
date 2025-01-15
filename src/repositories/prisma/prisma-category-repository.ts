import { Prisma, Category } from '@prisma/client';
import { CategoryRepository } from '../category-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCategoryRepository implements CategoryRepository {
  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = await prisma.category.create({ data });

    return category;
  }
}
