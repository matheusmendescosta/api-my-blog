import { Prisma, Tag } from '@prisma/client';
import { TagRepository } from '../tag-repository';
import { prisma } from '@/lib/prisma';

export class PrismaTagRepository implements TagRepository {
  async list(
    offset: number = 1,
    limit: number = 25
  ): Promise<{ totalCount: number; hasMore: boolean; offset: number; limit: number; tags: Tag[] }> {
    const count = await prisma.tag.count();

    const tags = await prisma.tag.findMany({
      take: limit,
      skip: (offset - 1) * limit,
    });

    const totalPages = Math.ceil(count / limit);

    const hasMore = offset < totalPages;

    return { totalCount: count, hasMore, offset, limit, tags };
  }
  async create(data: Prisma.TagCreateInput): Promise<Tag> {
    const tag = await prisma.tag.create({ data });

    return tag;
  }
}
