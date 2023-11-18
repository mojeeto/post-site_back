import { Router } from "express";
import authRouter from "./authRoute";
import errorMiddleware from "../middleware/errorMiddleware";

const rootRouter = Router();

rootRouter.use(authRouter);

export default rootRouter;
