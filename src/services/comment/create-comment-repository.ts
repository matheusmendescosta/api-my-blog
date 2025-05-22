import { CommentRepository } from '@/repositories/comment-repository';
import { Comment } from '@prisma/client';

interface CreateCommentServiceRequest {
  content: string;
  postId: string;
  userId?: string;
  parentCommentId?: string;
}

interface CreateCommentServiceResponse {
  comment: Comment;
}

export class CreateCommentService {
  constructor(private commentRepository: CommentRepository) {}

  async execute({ content, userId, postId, parentCommentId }: CreateCommentServiceRequest): Promise<CreateCommentServiceResponse> {
    const comment = await this.commentRepository.create({ content, userId, postId, parentCommentId });

    await fetch(`${process.env.N8N_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        postId,
      }),
    });

    return { comment };
  }
}
