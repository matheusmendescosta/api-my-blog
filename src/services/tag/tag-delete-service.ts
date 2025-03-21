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
    const findIdBy = await this.tagRepository.getById(id);

    if (!findIdBy) throw new TagNotFound();
    
    const tag = await this.tagRepository.deleteById(id);

    return { tag };
  }
}
