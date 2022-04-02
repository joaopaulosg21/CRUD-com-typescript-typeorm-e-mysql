import { Router } from "express";
import AuthController from "../controllers/authController";
import PostController from "../controllers/postController";
const post = new PostController()
const auth = new AuthController();
const postRouter = Router();

postRouter.post('/add',auth.verifyToken,post.newPost);

postRouter.get('/',post.getPosts);

postRouter.put('/update/:id',auth.verifyToken,post.updatePost);

postRouter.delete('/delete/:id',auth.verifyToken,post.deletePost);


export default postRouter;