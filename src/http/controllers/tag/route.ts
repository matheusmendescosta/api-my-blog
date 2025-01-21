import { AuthenticateMiddleware } from '@/http/middlewares/authenticate-middleware';
import { Router } from 'express';
import { CreateTagController } from './create-tag-controller';
import TagListController from './tag-list-controller';

const tagRoute = Router();

tagRoute.get('/tags', TagListController);
tagRoute.post('/tag', AuthenticateMiddleware, CreateTagController);

export default tagRoute;
