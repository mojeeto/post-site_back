import { ControllerType } from ".";
import Post from "../model/Post";

export const getPosts: ControllerType = async (req, res, next) => {
  const posts = await Post.find();
  res.json({
    posts,
  });
};
