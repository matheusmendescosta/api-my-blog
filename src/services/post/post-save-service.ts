import { SendPost } from '@/lib/nodemailer';
import { PostRepository } from '@/repositories/post-repository';
import { Post } from '@prisma/client';
import { PostNotFound } from '../errors/post-not-found';

interface PostSaveServiceRequest {
  postId: string;
  email: string;
}

interface PostSaveServiceResponse {
  post: Post;
}

export class PostSaveService {
  constructor(private postRepository: PostRepository) {}

  async execute({ email, postId }: PostSaveServiceRequest): Promise<PostSaveServiceResponse> {
    const post = await this.postRepository.get(postId);

    if (!post) throw new PostNotFound();

    await SendPost(email, postId, post.title);

    return { post };
  }
}
