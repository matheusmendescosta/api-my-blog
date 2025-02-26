import { PostRepository } from '@/repositories/post-repository';
import { Post } from '@prisma/client';

interface ListPostServiceRequest {
  offset?: number;
  limit?: number;
  draft?: boolean;
}

interface ListPostServiceResponse {
  posts: {
    totalCount: number;
    hasMore: boolean;
    offset: number;
    limit: number;
    posts: Post[];
  };
}

export class ListPostService {
  constructor(private postRepository: PostRepository) {}

  async execute({ offset, limit, draft }: ListPostServiceRequest): Promise<ListPostServiceResponse> {
    const posts = await this.postRepository.list(draft, offset, limit);

    return { posts };
  }
}
