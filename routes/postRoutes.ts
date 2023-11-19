import { Router } from "express";
import { getPosts } from "../controller/postController";

const postRouter = Router();

postRouter.get("/posts", getPosts); // for get all posts
postRouter.put("/post"); // create new post
postRouter.patch("/post/:postId"); // update a post
postRouter.delete("/post/:postId"); // delete a post

export default postRouter;
