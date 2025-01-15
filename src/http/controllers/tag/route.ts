import { Router } from 'express';
import { CreateTagController } from './create-tag-controller';

const tagRoute = Router();

tagRoute.post('/tag', CreateTagController);

export default tagRoute;
