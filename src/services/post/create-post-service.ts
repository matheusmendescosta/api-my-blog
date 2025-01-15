import { PostRepository } from '@/repositories/post-repository';
import { Post, PostStatus } from '@prisma/client';

interface CreatePostServiceRequest {
  title: string;
  slug: string;
  content: string;
  status: PostStatus;
}

interface CreatePostServiceResponse {
  post: Post;
}

export class CreatePostService {
  constructor(private postRepository: PostRepository) {}

  async execute({ title, slug, content, status }: CreatePostServiceRequest): Promise<CreatePostServiceResponse> {
    const { post } = this.postRepository.create({ title, slug, content, status });

    return { post };
  }
}
