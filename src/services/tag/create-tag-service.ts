import { TagRepository } from '@/repositories/tag-repository';
import { Tag } from '@prisma/client';
import { TagAlreadyExists } from '../errors/tag-already-exists';

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
    const tagExists = await this.tagRepository.findBySlug(name);

    if (tagExists) throw new TagAlreadyExists();

    const tag = await this.tagRepository.create({ name, slug });

    return { tag };
  }
}
