import { TagRepository } from '@/repositories/tag-repository';
import { Tag } from '@prisma/client';
import { TagNotFound } from '../errors/tag-not-found';

interface TagGetServiceRequest {
  id: string;
}

interface TagGetServiceResponse {
  tag: Tag | null;
}

export class TagGetService {
  constructor(private tagRepository: TagRepository) {}

  async execute({ id }: TagGetServiceRequest): Promise<TagGetServiceResponse> {
    const tag = await this.tagRepository.getById(id);

    if (!tag) throw new TagNotFound();

    return { tag };
  }
}
