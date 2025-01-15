import { Prisma, Post } from '@prisma/client';
import { PostRepository } from '../post-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPostRepository implements PostRepository {
  async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    const post = await prisma.post.create({ data });

    return post;
  }
}
