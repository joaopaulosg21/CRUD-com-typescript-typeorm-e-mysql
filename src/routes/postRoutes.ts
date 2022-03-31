import { Router } from "express";
import AuthController from "../controllers/authController";
import PostController from "../controllers/postController";
const post = new PostController()
const auth = new AuthController();
const postRouter = Router();

postRouter.post('/add',auth.verifyToken,post.newPost)


export default postRouter;