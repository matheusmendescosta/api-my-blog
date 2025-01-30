import { TagRepository } from '@/repositories/tag-repository';
import { Tag } from '@prisma/client';

interface TagListServiceRequest {
  offset?: number;
  limit?: number;
}

interface TagListServiceResponse {
  totalCount: number;
  hasMore: boolean;
  offset: number;
  limit: number;
  tags: Tag[];
}

export class TagListService {
  constructor(private tagRepository: TagRepository) {}

  async execute({ offset, limit }: TagListServiceRequest): Promise<TagListServiceResponse> {
    const tags = await this.tagRepository.list(offset, limit);

    return tags;
  }
}
