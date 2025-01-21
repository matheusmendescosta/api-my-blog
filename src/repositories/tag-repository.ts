import { Prisma, Tag } from '@prisma/client';

export interface TagRepository {
  create(data: Prisma.TagCreateInput): Promise<Tag>;
  list(offset?: number, limit?: number): Promise<Tag[]>;
}
