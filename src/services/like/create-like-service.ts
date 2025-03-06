import { LikeRepository } from '@/repositories/like-repository';
import { PostLike } from '@prisma/client';

interface CreateLikeServiceRequest {
  postId: string;
  userId?: string;
}

interface CreateLikeServiceResponse {
  like: PostLike;
}

export class CreateLikeService {
  constructor(private likeRepository: LikeRepository) {}

  async execute({ postId, userId }: CreateLikeServiceRequest): Promise<CreateLikeServiceResponse> {
    const like = await this.likeRepository.create({ postId, userId });

    return { like };
  }
}
