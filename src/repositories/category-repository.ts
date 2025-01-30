import { Category, Prisma } from '@prisma/client';

export interface CategoryRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  list(
    offset?: number,
    limit?: number
  ): Promise<{ totalCount: number; hasMore: boolean; offset: number; limit: number; category: Category[] }>;
}
