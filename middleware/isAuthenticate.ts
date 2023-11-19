import { verify } from "jsonwebtoken";
import { MiddlewareType } from ".";
import { CustomError } from "./errorMiddleware";
import env from "../utils/envalid";

const BARBER = "Barber ";
const HEADER_KEY = "Authorization";

export type JWT_PAYLOAD = {
  userId: string;
};

export const isAuthenticate: MiddlewareType = async (req, res, next) => {
  const header_value = req.get(HEADER_KEY);
  if (!header_value) {
    const error = new Error("Forbbiden") as CustomError;
    error.status = 403;
    return next(error);
  }
  const token = header_value.replace(BARBER, "");
  try {
    const decodedToken = verify(token, env.JWT_SECERT);
    req.userId = (decodedToken as JWT_PAYLOAD).userId;
    next();
  } catch (err) {
    res.status(403).json({
      message: "Please Authentication first!",
    });
  }
};
