import { Router } from "express";
import { putUser } from "../controller/authController";
import { body } from "express-validator";
import User from "../model/User";

const authRouter = Router();

authRouter.put(
  "/signup",
  [
    body("name", "Name must be not empty and is must be alphabet")
      .notEmpty()
      .trim(),
    body("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Email is not correct!")
      .custom(async (input, meta) => {
        const user = await User.findOne({ email: input });
        if (user) {
          throw new Error("Email is exists!");
        }
      }),
    body(
      "password",
      "Pasword must alpha numerical and length between 2 and more"
    )
      .trim()
      .notEmpty()
      .withMessage("Password is empty!")
      .isLength({ min: 2 })
      .withMessage("Password length must be 2 or more character.")
      .isString()
      .withMessage("Password must be string."),
    body("repeatpassword", "password not matches").custom((input, meta) => {
      return input === meta.req.body.password;
    }),
  ],
  putUser
);

export default authRouter;
