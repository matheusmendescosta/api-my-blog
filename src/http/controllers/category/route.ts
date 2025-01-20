import { Router } from 'express';
import { CreateCategoryController } from './create-category-controller';

const categoryRoute = Router();

categoryRoute.post('/category', CreateCategoryController);

export default categoryRoute;
