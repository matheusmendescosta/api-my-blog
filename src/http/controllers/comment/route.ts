import { Router } from 'express';
import { CreateCommentController } from './create-comment-controller';

const commentRoute = Router();

commentRoute.post('/comment/:postId', CreateCommentController);

export default commentRoute;
