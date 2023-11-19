import { Router } from "express";
import authRouter from "./authRoute";
import postRouter from "./postRoutes";

const rootRouter = Router();

rootRouter.use(authRouter);
rootRouter.use(postRouter);

export default rootRouter;
