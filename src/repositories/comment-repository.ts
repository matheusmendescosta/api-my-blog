import { Comment, Prisma } from '@prisma/client';

export interface CommentRepository {
  create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>;
}
