import { Router } from 'express';
import { CreateUserController } from './create-user-controller';
import UserGetController from './user-get-controller';
import { AuthenticateMiddleware } from '@/http/middlewares/authenticate-middleware';

const userRoute = Router();

userRoute.post('/user', CreateUserController);
userRoute.get('/user/:id', AuthenticateMiddleware, UserGetController);

export default userRoute;
