import { TagRepository } from '@/repositories/tag-repository';
import { Tag } from '@prisma/client';

interface CreateTagServiceRequest {
  name: string;
  slug: string;
}

interface CreateTagServiceResponse {
  tag: Tag;
}

export class CreateTagService {
  constructor(private tagRepository: TagRepository) {}

  async execute({ name, slug }: CreateTagServiceRequest): Promise<CreateTagServiceResponse> {
    const tag = await this.tagRepository.create({ name, slug });

    return { tag };
  }
}
