import { AuthenticateMiddleware } from '@/http/middlewares/authenticate-middleware';
import { Router } from 'express';
import { CreateUserController } from './create-user-controller';
import UserGetController from './user-get-controller';
import UserListController from './user-list-controller';

const userRoute = Router();

userRoute.post('/user', CreateUserController);
userRoute.get('/user/:id', AuthenticateMiddleware, UserGetController);
userRoute.get('/users', AuthenticateMiddleware, UserListController);

export default userRoute;
