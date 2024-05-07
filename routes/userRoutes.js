import express from "express";
import {
  validate,
  userValidator,
} from "../Middleware/userValidator/user-Validator.js";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", userValidator, validate, signup);
userRouter.post("/login", userValidator, validate, login);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:userId/:token", resetPassword);
userRouter.post("/logout", logout);

export default userRouter;
