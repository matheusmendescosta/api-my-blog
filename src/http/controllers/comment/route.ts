import { Router } from 'express';
import { CreateCommentController } from './create-comment-controller';
import { commentRateLimiter } from '@/http/middlewares/rate-limit-middleware';

const commentRoute = Router();

commentRoute.post('/comment/:postId', commentRateLimiter, CreateCommentController);

export default commentRoute;
