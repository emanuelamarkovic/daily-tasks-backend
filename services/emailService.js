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
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Password Reset Successful</h2>
    <p>Your password has been successfully reset. You can now log in with your new password.</p>
    <p>Best regards,<br/>
    <span style="font-weight: bold;">Your Daily Tasks Team</span></p>
  </div>
  <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ccc;">
    <p style="font-size: 0.8em; color: #777;">If you did not reset your password, please contact our support team immediately.</p>
  </footer>
  `,
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
