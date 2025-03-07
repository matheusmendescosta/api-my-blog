import { PostLike, Prisma } from '@prisma/client';

export interface LikeRepository {
  create(data: Prisma.PostLikeUncheckedCreateInput): Promise<PostLike>;
  findByIp(ip: string, postId: string): Promise<PostLike | null>;
}
