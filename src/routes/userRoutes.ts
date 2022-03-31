import { Router } from "express";
import UserController from "../controllers/userController";
const userRouter = Router();
const user = new UserController()

userRouter.post('/add',user.newUser)

export default userRouter;