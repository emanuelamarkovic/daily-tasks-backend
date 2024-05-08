import express from "express";
import {
  validate,
  userValidator,
} from "../Middleware/userValidator/user-Validator.js";
import {
  getAuthUser,
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/userController.js";
import { authenticate } from "../Middleware/userValidator/authenticate.js";
import { tokenValid } from "../Middleware/userValidator/tokenValid.js";

const userRouter = express.Router();

userRouter.post("/signup", userValidator, validate, signup);
userRouter.post("/login", userValidator, validate, login);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:userId/:token", resetPassword);
userRouter.post("/logout", logout);
userRouter.get("/token-valid", tokenValid);
userRouter.post("/auth-user-data").get(authenticate, getAuthUser);
export default userRouter;
