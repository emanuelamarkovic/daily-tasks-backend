import jwt from "jsonwebtoken";
import "../../config.js";

import createError from "http-errors";

export const authenticate = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    console.log("🎭 ~ authenticate ~ cookies:", cookies);
    const token = cookies.token;
    console.log("🎭 ~ authenticate ~ token:", token);
    if (!token) {
      return next(createError(401, "no token"));
    }
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    console.log("🎭 ~ authenticate ~ decoded:", decoded);
    req.userID = decoded.userID;
    next();
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
