import { validationResult } from "express-validator";
import { ControllerType } from ".";
import { CustomError } from "../middleware/errorMiddleware";
import Post from "../model/Post";
import User from "../model/User";

export const getPosts: ControllerType = async (req, res, next) => {
  const posts = await Post.find().populate({
    path: "creator",
    select: ["name", "email"],
  });
  res.json({
    posts,
  });
};

export const putPost: ControllerType = async (req, res, next) => {
  const { title, content } = req.body;
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    const error = new Error("Validation Error") as CustomError;
    error.validationErrors = validation.array();
    error.status = 401;
    return next(error);
  }

  const imageFile = req.file;
  if (!imageFile) {
    const error = new Error("Image not found!") as CustomError;
    error.status = 403;
    return next(error);
  }

  const user = await User.findOne({ _id: req.userId });
  if (!user) {
    const error = new Error("Please Authentication first!") as CustomError;
    error.status = 403;
    return next(error);
  }

  const post = new Post({
    title,
    content,
    imagePath: imageFile.path,
    creator: user,
  });

  try {
    await post.save();
    user.posts.push(post);
    await user.save();
    res.status(201).json({
      message: "Post Created!",
      success: true,
    });
  } catch (err) {
    const error = new Error("Error while creating post") as CustomError;
    error.status = 500;
    next(error);
  }
};
