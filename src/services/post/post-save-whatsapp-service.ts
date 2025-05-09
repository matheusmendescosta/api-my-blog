import { PostRepository } from '@/repositories/post-repository';
import { Post } from '@prisma/client';
import { PostNotFound } from '../errors/post-not-found';

interface PostSaveWhatsAppServiceRequest {
  postId: string;
  phone: string;
}

interface PostSaveWhatsAppServiceResponse {
  post: Post;
}

export class PostSaveWhatsAppService {
  constructor(private postRepository: PostRepository) {}

  async execute({ phone, postId }: PostSaveWhatsAppServiceRequest): Promise<PostSaveWhatsAppServiceResponse> {
    const post = await this.postRepository.get(postId);

    if (!post) throw new PostNotFound();

    await fetch(`${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_API_INSTANCE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apiKey: `${process.env.EVOLUTION_API_KEY}`,
      },
      body: JSON.stringify({
        number: phone,
        text: `Hello look you article ${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}`,
      }),
    });

    return { post };
  }
}
