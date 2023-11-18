import express, { NextFunction, Request, Response } from "express";
import rootMiddleware from "./middleware";
import rootRouter from "./routes";
import errorMiddleware, {
  generalErrorHandling,
} from "./middleware/errorMiddleware";
import mongoose from "mongoose";
import env from "./utils/envalid";

const app = express();

app.use(rootMiddleware);
app.use(rootRouter);
app.use(errorMiddleware);
app.use(generalErrorHandling);

mongoose
  .connect(env.MONGO_DB_URL + env.MONGO_DB_COLLECTION)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    throw new Error(err);
  });
