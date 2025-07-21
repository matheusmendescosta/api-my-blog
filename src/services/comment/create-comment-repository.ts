import { prompt } from '@/prompt/agent';
import { CommentRepository } from '@/repositories/comment-repository';
import { PostRepository } from '@/repositories/post-repository';
import { Comment } from '@prisma/client';
import { openai } from '@/lib/openai';

interface CreateCommentServiceRequest {
  content: string;
  postId: string;
  userId?: string;
  parentCommentId?: string;
}

interface CreateCommentServiceResponse {
  comment: Comment;
}

export class CreateCommentService {
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostRepository,
  ) {}

  async execute({ content, userId, postId, parentCommentId }: CreateCommentServiceRequest): Promise<CreateCommentServiceResponse> {
    const comment = await this.commentRepository.create({
      content,
      userId,
      postId,
      parentCommentId,
    });

    const post = await this.postRepository.get(postId);
    const postContent = post ? post.content : '';

    if (process.env.N8N_API_URL) {
      await fetch(process.env.N8N_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, postId }),
      });
    }
    
    setTimeout(async () => {
      try {
        const chatResponse = await openai.chat.completions.create({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: prompt.replace('{post_content}', postContent).replace('{user_comment}', content),
            },
            {
              role: 'user',
              content,
            },
          ],
        });

        const iaReply = chatResponse.choices?.[0]?.message?.content;

        if (iaReply && iaReply.trim().length > 0 && comment?.id) {
          await this.commentRepository.create({
            content: iaReply,
            postId,
            parentCommentId: parentCommentId ? parentCommentId : comment.id,
          });
        }
      } catch (error) {
        console.error('[AI_ERROR]', error);
      }
    }, 1000);

    return { comment };
  }
}
