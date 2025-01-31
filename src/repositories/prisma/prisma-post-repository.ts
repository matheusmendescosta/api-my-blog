import { Prisma, Post } from '@prisma/client';
import { PostRepository } from '../post-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPostRepository implements PostRepository {
  async get(id: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        _count: {
          select: { likes: true },
        },
        comments: true,
      },
    });

    return post;
  }
  async list(
    offset: number = 1,
    limit: number = 25
  ): Promise<{ totalCount: number; hasMore: boolean; offset: number; limit: number; posts: Post[] }> {
    const count = await prisma.post.count();

    const posts = await prisma.post.findMany({
      take: limit,
      skip: (offset - 1) * limit,
      include: {
        _count: {
          select: { likes: true },
        },
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const totalPages = Math.ceil(count / limit);

    const hasMore = offset < totalPages;

    return { totalCount: count, hasMore, offset, limit, posts };
  }
  async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    const post = await prisma.post.create({ data });

    return post;
  }
}
