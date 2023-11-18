import { validationResult } from "express-validator";
import { ControllerType } from ".";
import { CustomError } from "../middleware/errorMiddleware";
import { hash } from "bcryptjs";
import User from "../model/User";

export const putUser: ControllerType = async (req, res, next) => {
  const { name, email, password } = req.body;
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    const error = new Error("Validation Error") as CustomError;
    error.validationErrors = validation.array();
    error.status = 403;
    return next(error);
  }
  const hashedPassword = await hash(password, 16);
  const user = new User({ name, email, password: hashedPassword });
  try {
    user.save();
  } catch (err) {
    const error = new Error("Error while creating user.") as CustomError;
    error.status = 500;
    return next(error);
  }

  res.json({
    message: "User successfully created!",
  });
};
