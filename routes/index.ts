import { Router } from "express";
import authRouter from "./authRoute";
import postRouter from "./postRoutes";
import { isAuthenticate } from "../middleware/isAuthenticate";

const rootRouter = Router();

rootRouter.use(authRouter);
rootRouter.use(isAuthenticate, postRouter);

export default rootRouter;
