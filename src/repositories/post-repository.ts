import { Post, Prisma } from '@prisma/client';

export interface PostRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
}
