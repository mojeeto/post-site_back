import * as express from "express";
import { Types } from "mongoose";

declare module "express-serve-static-core" {
  export interface Request {
    userId: Types.ObjectId | string | null;
  }
}
