import { PostRepository } from '@/repositories/post-repository';
import { Post } from '@prisma/client';
import { PostNotFound } from '../errors/post-not-found';
import { sendWelcomeEmail } from '@/lib/nodemailer';

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

    //TODO: change for template save post
    await sendWelcomeEmail(email, postId);

    return { post };
  }
}
