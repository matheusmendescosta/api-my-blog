import { PostLike, Prisma } from '@prisma/client';

export interface LikeRepository {
  create(data: Prisma.PostLikeUncheckedCreateInput): Promise<PostLike>;
}
