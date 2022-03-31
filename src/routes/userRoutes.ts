import { Router } from "express";
import UserController from "../controllers/userController";
const userRouter = Router();
const user = new UserController()

userRouter.post('/add',user.newUser)

userRouter.get('/',user.getUsers)

userRouter.put('/update/:id',user.updateUser)

userRouter.delete('/delete/:id',user.deleteUser)

export default userRouter;