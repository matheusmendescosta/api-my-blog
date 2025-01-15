import { Router } from 'express';
import { CreatePostController } from './create-post-controller';

const postRoute = Router();

postRoute.post('/post/:authorId', CreatePostController);

export default postRoute;
