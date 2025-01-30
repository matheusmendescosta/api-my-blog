import { Router } from 'express';
import { CreateCategoryController } from './create-category-controller';
import { AuthenticateMiddleware } from '@/http/middlewares/authenticate-middleware';
import { ListCategoryController } from './list-category-controller';

const categoryRoute = Router();

categoryRoute.post('/category', AuthenticateMiddleware, CreateCategoryController);
categoryRoute.get('/categories', ListCategoryController);

export default categoryRoute;
