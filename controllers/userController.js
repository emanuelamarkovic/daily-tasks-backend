import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../services/emailService.js";
import { sendSignupConfirmationEmail } from "../services/sendSignupConfirmationEmail.js";

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      tasks: [],
    });
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    await newUser.save();
    newUser.password = undefined;
    await sendSignupConfirmationEmail(email, username);
    res.status(200).json({ message: "New User added! 🐒", newUser });
  } catch (error) {
    console.error("Error signing up:", error);
    res
      .status(500)
      .json({ message: "Error signing up. Please try again later." });
  }
};

const login = async (req, res) => {
  console.log("req.body:", req.body);
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(404)
        .json({ message: "user email or password are falase!" });
    }
    const passwordsMatched = await bcrypt.compare(password, foundUser.password);
    if (!passwordsMatched) {
      return res
        .status(401)
        .json({ message: "user email or password are falase!" });
    }
    const user = foundUser.toObject();
    delete user.password;
    const payload = { userID: user._id };
    const token = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: "1h",
    });
    console.log("token", token);
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "login successfully", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: error.message });
  }
};

const generateResetToken = async () => {
  const token = await bcrypt.hash(Math.random().toString(36).substring(2), 10);
  return token;
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const resetToken = generateResetToken(user);

    await sendPasswordResetEmail(user.email, resetToken);

    res
      .status(200)
      .json({ message: "An email for resetting the password has been sent." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ message: "Error resetting password. Please try again later." });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({ message: "logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { signup, login, forgotPassword, logout };
