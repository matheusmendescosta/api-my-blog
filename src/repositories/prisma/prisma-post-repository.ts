import { Prisma, Post, PostStatus } from '@prisma/client';
import { PostRepository } from '../post-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPostRepository implements PostRepository {
  async update(postId: string, data: Prisma.PostUpdateInput): Promise<Post> {
    const post = await prisma.post.update({
      where: { id: postId },
      data,
    });

    return post;
  }
  async get(id: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        _count: {
          select: { likes: true },
        },
        comments: {
          where: {
            parentCommentId: null,
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                  },
                },
              },
            },
          },
        },
        category: true,
        tags: true,
      },
    });

    return post;
  }
  async list(
    draft: boolean = false,
    offset: number = 1,
    limit: number = 25,
  ): Promise<{ totalCount: number; hasMore: boolean; offset: number; limit: number; posts: Post[] }> {
    const whereCondition = draft ? {} : { status: PostStatus.PUBLISHED };

    const count = await prisma.post.count({
      where: whereCondition,
    });

    const posts = await prisma.post.findMany({
      take: limit,
      skip: (offset - 1) * limit,
      where: whereCondition,
      include: {
        _count: {
          select: { likes: true, comments: true },
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            role: true,
          },
        },
        category: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const totalPages = Math.ceil(count / limit);

    const hasMore = offset < totalPages;

    return { totalCount: count, hasMore, offset, limit, posts };
  }
  async create(data: Prisma.PostCreateInput): Promise<Post> {
    const post = await prisma.post.create({ data });

    return post;
  }
}
