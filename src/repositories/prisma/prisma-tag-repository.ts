import { Prisma, Tag } from '@prisma/client';
import { TagRepository } from '../tag-repository';
import { prisma } from '@/lib/prisma';

export class PrismaTagRepository implements TagRepository {
  async create(data: Prisma.TagCreateInput): Promise<Tag> {
    const tag = await prisma.tag.create({ data });

    return tag;
  }
}
