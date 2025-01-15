import { Post, Prisma } from '@prisma/client';

export interface PostRepository {
  create(data: Prisma.PostCreateInput): Promise<Post>;
}
