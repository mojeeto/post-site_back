import bodyParser from "body-parser";
import multer from "multer";
import { Router } from "express";
import path from "path";

export const validTypes = ["image/jpg", "image/jpeg", "image/png"];

const parserMiddleware = Router();

parserMiddleware.use(bodyParser.json());
parserMiddleware.use(
  multer({
    fileFilter: (req, file, cb) => {
      if (!validTypes.includes(file.mimetype)) cb(null, false);
      cb(null, true);
    },
    storage: multer.diskStorage({
      filename(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
      },
      destination(req, file, cb) {
        cb(null, "images");
      },
    }),
  }).single("postImage")
);

export default parserMiddleware;
