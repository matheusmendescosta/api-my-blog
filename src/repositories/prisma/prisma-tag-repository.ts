import { Prisma, Tag } from '@prisma/client';
import { TagRepository } from '../tag-repository';
import { prisma } from '@/lib/prisma';

export class PrismaTagRepository implements TagRepository {
  async list(): Promise<Tag[]> {
    const tags = await prisma.tag.findMany({});

    return tags;
  }
  async create(data: Prisma.TagCreateInput): Promise<Tag> {
    const tag = await prisma.tag.create({ data });

    return tag;
  }
}
