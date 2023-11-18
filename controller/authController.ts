import { validationResult } from "express-validator";
import { ControllerType } from ".";
import { CustomError } from "../middleware/errorMiddleware";

export const putUser: ControllerType = (req, res, next) => {
  const { name, email, password } = req.body;
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    const error = new Error("Validation Error") as CustomError;
    error.validationErrors = validation.array();
    error.status = 403;
    return next(error);
  }

  res.json({
    message: "User successfully created!",
    user: {
      name,
      email,
      password,
    },
  });
};
