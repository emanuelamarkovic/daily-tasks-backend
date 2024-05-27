import express from "express";
import {
  validate,
  userValidator,
} from "../Middleware/userValidator/user-Validator.js";
//import { cloudinaryMulter } from "../upload-Image.js";
import {
  signup,
  login,
  getUsers,
  forgotPassword,
  resetPassword,
  logout,
  uploadAvatarImg,getAuthUser,
  getUserById, getUserWithTasks
} from "../controllers/userController.js";
import { authenticate } from "../Middleware/userValidator/authenticate.js";
import { tokenValid } from "../Middleware/userValidator/tokenValid.js";

const userRouter = express.Router();
userRouter.get("/:id", getUserWithTasks)
import cloudinaryMulter from "../upload-Image.js";
import upload from "../upload-Image.js";
//userRouter.get("/:id", getUserById);
userRouter.post("/signup", userValidator, validate, signup);
userRouter.post("/login", userValidator, validate, login);
userRouter.get("/",getUsers)
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:userId/:token", resetPassword);
userRouter.post("/logout", logout);
userRouter.get("/token-valid", tokenValid);
userRouter.post("/auth-user-data").get(authenticate, getAuthUser);

 userRouter.put('/upload-avatar/:id', upload.single('image'), uploadAvatarImg);

export default userRouter;
