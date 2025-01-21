import { PostRepository } from '@/repositories/post-repository';
import { Post } from '@prisma/client';

interface ListPostServiceRequest {
  offset?: number;
  limit?: number;
}

interface ListPostServiceResponse {
  posts: Post[];
}

export class ListPostService {
  constructor(private postRepository: PostRepository) {}

  async execute({ offset, limit }: ListPostServiceRequest): Promise<ListPostServiceResponse> {
    const posts = await this.postRepository.list(offset, limit);

    return { posts };
  }
}
