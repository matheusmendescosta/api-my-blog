import { CommentRepository } from '@/repositories/comment-repository';
import { Comment } from '@prisma/client';

interface CreateCommentServiceRequest {
  content: string;
  userId: string;
  postId: string;
}

interface CreateCommentServiceResponse {
  comment: Comment;
}

export class CreateCommentService {
  constructor(private commentRepository: CommentRepository) {}

  async execute({ content, userId, postId }: CreateCommentServiceRequest): Promise<CreateCommentServiceResponse> {
    const comment = await this.commentRepository.create({ content, userId, postId });

    return { comment };
  }
}
