import { Router } from "express";
import { CreateUserController } from "./create-user-controller";

const userRoute = Router();

userRoute.post("/user", (request, response) =>
  CreateUserController(request, response)
);

export default userRoute;
