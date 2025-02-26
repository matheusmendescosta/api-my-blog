import { AuthenticateMiddleware } from '@/http/middlewares/authenticate-middleware';
import { Router } from 'express';
import { PostCreateController } from './post-create-controller';
import PostGetController from './post-get-controller';
import { PostListController } from './post-list-controller';
import { PostEditController } from './post-edit-controller';

const postRoute = Router();

postRoute.post('/post/:authorId', AuthenticateMiddleware, PostCreateController);
postRoute.get('/posts', PostListController);
postRoute.get('/post/:id', PostGetController);
postRoute.put('/post/:postId', AuthenticateMiddleware, PostEditController);

export default postRoute;
