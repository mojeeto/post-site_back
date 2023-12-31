import { validationResult } from "express-validator";
import { ControllerType } from ".";
import { CustomError, IsCustomError } from "../middleware/errorMiddleware";
import Post from "../model/Post";
import User from "../model/User";
import { io } from "../app";

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
    io.emit("posts", { action: "create", post });
    res.status(201).json({
      message: "Post Created!",
      success: true,
      post,
    });
  } catch (err) {
    const error = new Error("Error while creating post") as CustomError;
    error.status = 500;
    next(error);
  }
};

export const updatePost: ControllerType = async (req, res, next) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    const error = new Error("Validation Error") as CustomError;
    error.validationErrors = validation.array();
    error.status = 401;
    return next(error);
  }

  const imageFile = req.file;

  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      const error = new Error("Please Authenticate first.") as CustomError;
      error.status = 403;
      throw error;
    }
    const post = await Post.findOne({ _id: postId, creator: user });
    if (!post) {
      const error = new Error("Post not found!") as CustomError;
      error.status = 404;
      throw error;
    }
    post.title = title;
    post.content = content;
    if (imageFile) post.imagePath = imageFile.path;
    await post.save();
    const updatedPost = await Post.findOne({ _id: post }).populate("creator");
    io.emit("posts", { action: "update", post });
    res.json({
      sucess: true,
      status: "updated",
      message: "Post succesfully updated!",
      post: updatedPost,
    });
  } catch (err: unknown) {
    const error = new Error("Error while update post!") as CustomError;
    if (IsCustomError(err)) {
      error.message = err.message;
      error.status = err.status;
    }
    next(error);
  }
};

export const deletePost: ControllerType = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      const error = new Error("Please authentication first!") as CustomError;
      error.status = 403;
      throw error;
    }
    const post = await Post.findOneAndDelete({ _id: postId, creator: user });
    if (!post) {
      const error = new Error("Post not found!") as CustomError;
      error.status = 404;
      throw error;
    }

    user.posts.pull(post);
    await user.save();

    io.emit("posts", { action: "delete", post });
    res.json({
      status: "deleted!",
      success: true,
      message: "post deleted!",
    });
  } catch (err: unknown) {
    const error = new Error("Error while deleting post") as CustomError;
    if (IsCustomError(err)) {
      error.status = err.status;
      error.message = err.message;
    }
    next(error);
  }
};
