import { Prisma, Category } from '@prisma/client';
import { CategoryRepository } from '../category-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCategoryRepository implements CategoryRepository {
  async list(
    offset: number = 1,
    limit: number = 25
  ): Promise<{ totalCount: number; hasMore: boolean; offset: number; limit: number; category: Category[] }> {
    const count = await prisma.category.count();

    const category = await prisma.category.findMany({
      take: limit,
      skip: (offset - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const totalPages = Math.ceil(count / limit);

    const hasMore = offset < totalPages;

    return { totalCount: count, hasMore, offset, limit, category };
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = await prisma.category.create({ data });

    return category;
  }
}
