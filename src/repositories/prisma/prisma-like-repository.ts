import { prisma } from '@/lib/prisma';
import { PostLike, Prisma } from '@prisma/client';
import { LikeRepository } from '../like-repository';

export class PrismaLikeRepository implements LikeRepository {
  async findByIp(ip: string, postId: string): Promise<PostLike | null> {
    const like = await prisma.postLike.findFirst({ where: { ip, postId } });

    return like;
  }

  async create(data: Prisma.PostLikeUncheckedCreateInput): Promise<PostLike> {
    const like = await prisma.postLike.create({ data });

    return like;
  }
}
