import { Router } from "express";
import AuthController from "../controllers/authController";
import UserController from "../controllers/userController";
const userRouter = Router();
const user = new UserController()
const auth = new AuthController();

userRouter.post('/add',user.newUser)

userRouter.get('/',user.getUsers)

userRouter.put('/update/',auth.verifyToken,user.updateUser)

userRouter.delete('/delete/',auth.verifyToken,user.deleteUser)

userRouter.post('/login',user.userLogin)

export default userRouter;