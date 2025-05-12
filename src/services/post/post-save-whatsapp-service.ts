import { PostRepository } from '@/repositories/post-repository';
import { Post } from '@prisma/client';
import { PostNotFound } from '../errors/post-not-found';

interface PostSaveWhatsAppServiceRequest {
  postId: string;
  phone: string;
  name: string;
}

interface PostSaveWhatsAppServiceResponse {
  post: Post;
}

export class PostSaveWhatsAppService {
  constructor(private postRepository: PostRepository) {}

  async execute({ phone, postId, name }: PostSaveWhatsAppServiceRequest): Promise<PostSaveWhatsAppServiceResponse> {
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
        text: `Olá ${name}!\nSegue o link do post do my brain 🧠\n\n${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}`,
      }),
    });

    return { post };
  }
}
