import { Router } from "express";
import { CreateUserController } from "./create-user-controller";

const userRoute = Router();

userRoute.post("/user", CreateUserController);

export default userRoute;
