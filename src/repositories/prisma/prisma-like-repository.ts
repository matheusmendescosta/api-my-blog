import { Prisma, PostLike } from '@prisma/client';
import { LikeRepository } from '../like-repository';
import { prisma } from '@/lib/prisma';

export class PrismaLikeRepository implements LikeRepository {
  create(data: Prisma.PostLikeUncheckedCreateInput): Promise<PostLike> {
    const like = prisma.postLike.create({ data });

    return like;
  }
}
