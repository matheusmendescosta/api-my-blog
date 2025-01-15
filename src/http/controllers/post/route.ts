import { Router } from 'express';
import { PostCreateController } from './post-create-controller';
import { PostListController } from './post-list-controller';
import PostGetController from './post-get-controller';

const postRoute = Router();

postRoute.post('/post/:authorId', PostCreateController);
postRoute.get('/posts', PostListController);
postRoute.get('/post/:id', PostGetController);

export default postRoute;
