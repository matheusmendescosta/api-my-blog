import { AuthenticateMiddleware } from '@/http/middlewares/authenticate-middleware';
import { Router } from 'express';
import { CreateTagController } from './create-tag-controller';
import TagListController from './tag-list-controller';
import { TagDeleteController } from './tag-delete-controller';
import { TagGetController } from './tag-get-controller';

const tagRoute = Router();

tagRoute.get('/tags', TagListController);
tagRoute.post('/tag', AuthenticateMiddleware, CreateTagController);
tagRoute.delete('/tag/:id', AuthenticateMiddleware, TagDeleteController);
tagRoute.get('/tag/:id', AuthenticateMiddleware, TagGetController);

export default tagRoute;
