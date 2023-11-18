import express, { NextFunction, Request, Response } from "express";
import rootMiddleware from "./middleware";
import rootRouter from "./routes";
import errorMiddleware, {
  generalErrorHandling,
} from "./middleware/errorMiddleware";

const app = express();

app.use(rootMiddleware);
app.use(rootRouter);
app.use(errorMiddleware);
app.use(generalErrorHandling);

app.listen(8080);
