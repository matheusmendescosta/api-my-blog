import { CategoryRepository } from '@/repositories/category-repository';
import { Category } from '@prisma/client';

interface CategoryListServiceRequest {
  offset?: number;
  limit?: number;
}

interface CategoryListServiceResponse {
  totalCount: number;
  hasMore: boolean;
  offset: number;
  limit: number;
  category: Category[];
}

export class CategoryListService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ offset, limit }: CategoryListServiceRequest): Promise<CategoryListServiceResponse> {
    const categories = await this.categoryRepository.list(offset, limit);

    return categories;
  }
}
