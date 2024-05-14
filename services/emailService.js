import nodemailer from "nodemailer";
import { MOBILE_IP } from "../config.js";

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "emanuela.markovic@hotmail.com",
    pass: "24031986",
  },
});

const sendPasswordResetEmail = async (recipientEmail, userId, token) => {
  const mailOptions = {
    from: "emanuela.markovic@hotmail.com",
    to: recipientEmail,
    subject: "Password Reset for Daily Tasks",
    html: ` <p>Hi there,</p>
    <p>We received a request to reset your password. Please follow the link below to reset your password:</p>
    <a href="http://localhost:19006/reset-password/${userId.toString()}/${token}" >Reset Password</a>
    <p>If you did not request this password reset, you can safely ignore this email.</p>
    <p>Best regards,<br/>Your Daily Tasks Team</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email.");
  }
};

export { sendPasswordResetEmail };
