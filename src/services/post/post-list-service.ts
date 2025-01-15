import { PostRepository } from '@/repositories/post-repository';
import { Post } from '@prisma/client';

interface ListPostServiceRequest {}

interface ListPostServiceResponse {
  posts: Post[];
}

export class ListPostService {
  constructor(private postRepository: PostRepository) {}

  async execute({}: ListPostServiceRequest): Promise<ListPostServiceResponse> {
    const posts = await this.postRepository.list();

    return { posts };
  }
}
