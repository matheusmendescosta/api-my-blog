import { PostRepository } from '@/repositories/post-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Post, PostStatus } from '@prisma/client';
import { UserNotFound } from '../errors/user-not-found';
import { PostNotFound } from '../errors/post-not-found';
import { Forbidden } from '../errors/forbidden';

interface PostEditServiceRequest {
  postId: string;
  title: string;
  slug: string;
  content: string;
  status: PostStatus;
  authorId: string;
  categoryId: string;
  tags: string[];
}

interface PostEditServiceResponse {
  updatePost: Post;
}

export class PostEditService {
  constructor(
    private userRepository: UserRepository,
    private postRepository: PostRepository,
  ) {}

  async execute({
    postId,
    authorId,
    categoryId,
    content,
    slug,
    status,
    tags,
    title,
  }: PostEditServiceRequest): Promise<PostEditServiceResponse> {
    const findAuthor = await this.userRepository.findById(authorId);

    const findPost = await this.postRepository.get(postId);

    if (!findAuthor) throw new UserNotFound();

    if (!findPost) throw new PostNotFound();

    if (findPost.authorId !== authorId) throw new Forbidden();

    const updatePost = await this.postRepository.update(postId, {
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

    return { updatePost };
  }
}
