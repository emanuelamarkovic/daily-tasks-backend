import jwt from "jsonwebtoken";
import "../../config.js";
import User from "./../../models/user.js";
import createError from "http-errors";

export const tokenValid = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    console.log("🎭 ~ tokenValid ~ token:", token);
    if (!token) {
      return next(createError(401, "no token"));
    }
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findById(decoded.userID);
    res.json(decoded, user);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(createError(401, "Token Expired!"));
    }
    if (error.name === "JsonWebTokenError") {
      return next(createError(401, "Token invalid!"));
    }
    return next(error);
  }
};
