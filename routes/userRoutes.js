import express from "express";
import {
  validate,
  userValidator,
} from "../Middleware/userValidator/user-Validator.js";
import { cloudinaryMulter } from "../upload-Image.js";
import {
  getUsers,
  signup,
  login,
  forgotPassword,
  logout, uploadAvatarImg
} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get("/",getUsers)
userRouter.post("/signup", userValidator, validate, signup);
userRouter.post("/login", userValidator, validate, login);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/logout", logout);
userRouter  .route("/upload-avatar/:id")
.patch(cloudinaryMulter.single("image"), uploadAvatarImg);

export default userRouter;
