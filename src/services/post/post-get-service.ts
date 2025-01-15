import { PostRepository } from '@/repositories/post-repository';
import { Post } from '@prisma/client';

interface PostGetServiceRequest {
  id: string;
}

interface PostGetServiceResponse {
  post: Post | null;
}

export class PostGetService {
  constructor(private postRepository: PostRepository) {}

  async execute({ id }: PostGetServiceRequest): Promise<PostGetServiceResponse> {
    const post = await this.postRepository.get(id);

    return { post };
  }
}
