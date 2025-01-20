import { TagRepository } from '@/repositories/tag-repository';
import { Tag } from '@prisma/client';

interface TagListServiceRequest {}

interface TagListServiceResponse {
  tags: Tag[];
}

export class TagListService {
  constructor(private tagRepository: TagRepository) {}

  async execute({}: TagListServiceRequest): Promise<TagListServiceResponse> {
    const tags = await this.tagRepository.list();

    return { tags };
  }
}
