import { Prisma, Tag } from '@prisma/client';

export interface TagRepository {
  create(data: Prisma.TagCreateInput): Promise<Tag>;
  list(offset?: number, limit?: number): Promise<{ totalCount: number; hasMore: boolean; offset: number; limit: number; tags: Tag[] }>;
  getById(id: string): Promise<Tag | null>;
  deleteById(id: string): Promise<Tag | null>;
  findBySlug(slug: string): Promise<Tag | null>;
}
