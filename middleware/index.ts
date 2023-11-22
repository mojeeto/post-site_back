import express from "express";
import path from "path";
import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import parserMiddleware from "./parserMiddleware";
import { CustomError } from "./errorMiddleware";
import cors from "cors";

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

rootMiddleware.use(cors());
rootMiddleware.use(parserMiddleware);
rootMiddleware.use(
  "/images",
  express.static(path.join(require.main!.path, "images"))
);

export default rootMiddleware;
