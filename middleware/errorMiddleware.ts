import { ValidationError } from "express-validator";
import { MiddlewareErrorType, MiddlewareType } from ".";
import { NextFunction, Request, Response, Router } from "express";

const errorMiddleware = Router();

export type CustomError = {
  status: number;
  validationErrors: ValidationError[];
} & Error;

export const IsCustomError = (obj: CustomError | any): obj is CustomError => {
  return (
    obj && Object.keys(obj).includes("status") && typeof obj.status === "number"
  );
};

export const generalErrorHandling: MiddlewareErrorType = (
  err,
  req,
  res,
  next
) => {
  res.status(err.status || 500).json({
    errorMessages: err.validationErrors,
    message: err.message,
  });
};

const notFoundError: MiddlewareType = (req, res, next) => {
  res.status(404).json({
    message: `The ${req.path} not found.`,
  });
};

errorMiddleware.use(notFoundError);

export default errorMiddleware;
