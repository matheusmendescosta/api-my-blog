import { Post, Prisma } from '@prisma/client';

export interface PostRepository {
  create(data: Prisma.PostCreateInput): Promise<Post>;
  list(
    draft?: boolean,
    offset?: number,
    limit?: number,
  ): Promise<{ totalCount: number; hasMore: boolean; offset: number; limit: number; posts: Post[] }>;
  get(id: string): Promise<Post | null>;
  update(postId: string, data: Prisma.PostUpdateInput): Promise<Post>;
}
