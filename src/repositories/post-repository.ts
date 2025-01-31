import { Post, Prisma } from '@prisma/client';

export interface PostRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
  list(offset?: number, limit?: number): Promise<{ totalCount: number; hasMore: boolean; offset: number; limit: number; posts: Post[] }>;
  get(id: string): Promise<Post | null>;
}
