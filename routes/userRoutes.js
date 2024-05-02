import express from "express";
import {
  signup,
  login,
  forgotPassword,
  logout,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/logout", logout);

export default userRouter;
