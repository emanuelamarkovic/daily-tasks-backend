import express from "express";
import {
  validate,
  userValidator,
} from "../Middleware/userValidator/user-Validator.js";
import { cloudinaryMulter } from "../upload-Image.js";
import {
  getAuthUser,
  getUsers,
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
  uploadAvatarImg,
} from "../controllers/userController.js";
import { authenticate } from "../Middleware/userValidator/authenticate.js";
import { tokenValid } from "../Middleware/userValidator/tokenValid.js";

const userRouter = express.Router();
userRouter.get("/", getUsers);
userRouter.post("/signup", userValidator, validate, signup);
userRouter.post("/login", userValidator, validate, login);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:userId/:token", resetPassword);
userRouter.post("/logout", logout);
userRouter.get("/token-valid", tokenValid);
userRouter.post("/auth-user-data").get(authenticate, getAuthUser);

userRouter
  .route("/upload-avatar/:id")
  .patch(cloudinaryMulter.single("image"), uploadAvatarImg);

export default userRouter;
