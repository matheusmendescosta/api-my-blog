import { LikeRepository } from '@/repositories/like-repository';
import { PostLike } from '@prisma/client';
import { IpAlreadyLiked } from '../errors/ip-already-liked';

interface CreateLikeServiceRequest {
  postId: string;
  userId?: string;
  ip: string;
}

interface CreateLikeServiceResponse {
  like: PostLike;
}

export class CreateLikeService {
  constructor(private likeRepository: LikeRepository) {}

  async execute({ postId, userId, ip }: CreateLikeServiceRequest): Promise<CreateLikeServiceResponse> {
    const likeExist = await this.likeRepository.findByIp(ip, postId);

    if (likeExist) throw new IpAlreadyLiked();

    const like = await this.likeRepository.create({ postId, userId, ip });

    return { like };
  }
}
