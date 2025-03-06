import { Prisma, PostLike } from '@prisma/client';
import { LikeRepository } from '../like-repository';
import { prisma } from '@/lib/prisma';

export class PrismaLikeRepository implements LikeRepository {
  async create(data: Prisma.PostLikeUncheckedCreateInput): Promise<PostLike> {
    const like = await prisma.postLike.create({ data });

    return like;
  }
}
