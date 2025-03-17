import { TagRepository } from '@/repositories/tag-repository';
import { Tag } from '@prisma/client';
import { TagNotFound } from '../errors/tag-not-found';

interface TagDeleteServiceRequest {
  id: string;
}

interface TagDeleteServiceResponse {
  tag: Tag | null;
}

export class TagDeleteService {
  constructor(private tagRepository: TagRepository) {}

  async execute({ id }: TagDeleteServiceRequest): Promise<TagDeleteServiceResponse> {
    const tag = await this.tagRepository.deleteById(id);

    if (!tag) throw new TagNotFound();

    return { tag };
  }
}
