import { Router } from 'express';
import { CreateCategoryController } from './create-category-controller';
import { AuthenticateMiddleware } from '@/http/middlewares/authenticate-middleware';

const categoryRoute = Router();

categoryRoute.use(AuthenticateMiddleware);
categoryRoute.post('/category', CreateCategoryController);

export default categoryRoute;
