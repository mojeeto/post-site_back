import { validationResult } from "express-validator";
import { ControllerType } from ".";
import { CustomError } from "../middleware/errorMiddleware";
import { compare, hash } from "bcryptjs";
import User from "../model/User";
import { sign } from "jsonwebtoken";
import env from "../utils/envalid";
import { JWT_PAYLOAD } from "../middleware/isAuthenticate";

export const putUser: ControllerType = async (req, res, next) => {
  const { name, email, password } = req.body;
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    const error = new Error("Validation Error") as CustomError;
    error.validationErrors = validation.array();
    error.status = 403;
    return next(error);
  }
  try {
    const hashedPassword = await hash(password, 16);
    const user = new User({ name, email, password: hashedPassword });
    user.save();
    res.json({
      message: "User successfully created!",
    });
  } catch (err) {
    const error = new Error("Error while creating user.") as CustomError;
    error.status = 500;
    return next(error);
  }
};

export const signInUser: ControllerType = async (req, res, next) => {
  const { email, password } = req.body;

  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    const error = new Error("Validation Error") as CustomError;
    error.validationErrors = validation.array();
    error.status = 403;
    return next(error);
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("User not Found!") as CustomError;
    error.status = 404;
    return next(error);
  }
  try {
    const result = await compare(password, user.password);
    if (!result) {
      const error = new Error("Password is not correct!") as CustomError;
      error.status = 404;
      return next(error);
    }
    const payload: JWT_PAYLOAD = {
      userId: user._id,
    };
    const token = sign(payload, env.JWT_SECERT, {
      expiresIn: "1h",
    });
    res.json({
      message: "user found!",
      user,
      token,
    });
  } catch (err) {
    const error = new Error("Error fetch user.") as CustomError;
    error.status = 500;
    return next(error);
  }
};
