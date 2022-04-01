import { Router } from "express";
import AuthController from "../controllers/authController";
import PostController from "../controllers/postController";
const post = new PostController()
const auth = new AuthController();
const postRouter = Router();

postRouter.post('/add',auth.verifyToken,post.newPost);

postRouter.get('/',post.viewPosts);

postRouter.put('/update/:id',auth.verifyToken,post.updatePost)


export default postRouter;