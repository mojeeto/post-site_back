import { Router } from "express";
import { getPosts, putPost } from "../controller/postController";
import { body } from "express-validator";

const postRouter = Router();

postRouter.get("/posts", getPosts); // for get all posts
postRouter.put(
  "/post",
  [
    body("title").notEmpty().withMessage("title is empty"),
    body("content").notEmpty().withMessage("content is empty"),
  ],
  putPost
); // create new post
postRouter.patch("/post/:postId"); // update a post
postRouter.delete("/post/:postId"); // delete a post

export default postRouter;
