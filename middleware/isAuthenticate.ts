import { verify, JwtPayload } from "jsonwebtoken";
import { MiddlewareType } from ".";
import { CustomError } from "./errorMiddleware";
import env from "../utils/envalid";
import User from "../model/User";

const BARBER = "Barber ";
const HEADER_KEY = "Authorization";

export type JWT_PAYLOAD = {
  userId: string;
} & JwtPayload;

export const isAuthenticate: MiddlewareType = async (req, res, next) => {
  const header_value = req.get(HEADER_KEY);
  if (!header_value) {
    const error = new Error("Forbbiden") as CustomError;
    error.status = 403;
    return next(error);
  }
  try {
    const token = header_value.replace(BARBER, "");
    const decodedToken = verify(token, env.JWT_SECERT) as JWT_PAYLOAD;
    const userId = decodedToken.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) throw Error;
    req.userId = userId;
    next();
  } catch (err) {
    res.status(403).json({
      message: "Please Authentication first!",
    });
  }
};
