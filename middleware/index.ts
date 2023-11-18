import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import parserMiddleware from "./parserMiddleware";
import errorMiddleware, { CustomError } from "./errorMiddleware";

export type MiddlewareType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type MiddlewareErrorType = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const rootMiddleware = Router();

rootMiddleware.use(parserMiddleware);

export default rootMiddleware;
