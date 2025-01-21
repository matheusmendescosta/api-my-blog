import { Router } from 'express';
import userAuthenticateController from '../controllers/authenticate/user-authenticate-controller';

const authRoute = Router();

authRoute.post('/auth', userAuthenticateController);

export default authRoute;
