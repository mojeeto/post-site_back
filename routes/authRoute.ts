import { Router } from "express";
import { putUser } from "../controller/authController";
import { body } from "express-validator";

const authRouter = Router();

authRouter.put(
  "/signup",
  [
    body("name", "Name must be not empty and is must be alphabet")
      .notEmpty()
      .trim(),
    body("email", "Email is not correct.").trim().normalizeEmail().isEmail(),
    body(
      "password",
      "Pasword must alpha numerical and length between 2 and more"
    )
      .trim()
      .isLength({ min: 2 })
      .isAlphanumeric(),
    body("repeatpassword", "password not matches").custom((input, meta) => {
      return input === meta.req.body.password;
    }),
  ],
  putUser
);

export default authRouter;
