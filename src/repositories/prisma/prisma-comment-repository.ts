import { Prisma, Comment } from '@prisma/client';
import { CommentRepository } from '../comment-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCommentRepository implements CommentRepository {
  async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    const comment = await prisma.comment.create({ data });

    return comment;
  }
}
