import { PostRepository } from '@/repositories/post-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Post, PostStatus } from '@prisma/client';
import { UserNotFound } from '../errors/user-not-found';

interface CreatePostServiceRequest {
  title: string;
  slug: string;
  content: string;
  status: PostStatus;
  authorId: string;
  categoryId: string;
  tags: string[];
}

interface CreatePostServiceResponse {
  post: Post;
}

export class CreatePostService {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    title,
    slug,
    content,
    status,
    authorId,
    categoryId,
    tags,
  }: CreatePostServiceRequest): Promise<CreatePostServiceResponse> {
    const findAuthor = await this.userRepository.findById(authorId);

    if (!findAuthor) throw new UserNotFound();

    const post = await this.postRepository.create({
      title,
      slug,
      content,
      status,
      author: {
        connect: { id: authorId },
      },
      category: {
        connect: { id: categoryId },
      },
      tags: {
        connect: tags.map((tagId) => ({ id: tagId })),
      },
    });

    return { post };
  }
}
