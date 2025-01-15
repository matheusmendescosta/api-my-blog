import { CategoryRepository } from '@/repositories/category-repository';
import { Category } from '@prisma/client';

interface CreateCategoryServiceRequest {
  name: string;
  slug: string;
}

interface CreateCategoryServiceResponse {
  category: Category;
}

export class CreateCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ name, slug }: CreateCategoryServiceRequest): Promise<CreateCategoryServiceResponse> {
    const category = await this.categoryRepository.create({ name, slug });

    return { category };
  }
}
