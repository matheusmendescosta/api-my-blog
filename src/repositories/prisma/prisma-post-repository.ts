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

  async list(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
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
    return posts;
  }

  async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    const post = await prisma.post.create({ data });

    return post;
  }
}
