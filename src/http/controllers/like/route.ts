import { Router } from 'express';
import { CreateLikeController } from './create-like-controller';

const likeRoute = Router();

likeRoute.post('/like/:postId', CreateLikeController);

export default likeRoute;
