import { Router } from "express";
import { getPosts, putPost, updatePost } from "../controller/postController";
import { body } from "express-validator";
import { multerMiddleware } from "../middleware/parserMiddleware";

const postRouter = Router();

postRouter.get("/posts", getPosts); // for get all posts
postRouter.put(
  "/post",
  multerMiddleware,
  [
    body("title").notEmpty().withMessage("title is empty"),
    body("content").notEmpty().withMessage("content is empty"),
  ],
  putPost
); // create new post
postRouter.patch(
  "/post/:postId",
  multerMiddleware,
  [
    body("title").notEmpty().withMessage("title is empty"),
    body("content").notEmpty().withMessage("content is empty"),
  ],
  updatePost
); // update a post
postRouter.delete("/post/:postId"); // delete a post

export default postRouter;
