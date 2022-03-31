import { Router } from "express";
import UserController from "../controllers/userController";
const userRouter = Router();
const user = new UserController()

userRouter.post('/add',user.newUser)

userRouter.get('/',user.getUsers)

userRouter.put('/update/:id',user.updateUser)

userRouter.delete('/delete/:id',user.deleteUser)

userRouter.post('/login',user.userLogin)

export default userRouter;