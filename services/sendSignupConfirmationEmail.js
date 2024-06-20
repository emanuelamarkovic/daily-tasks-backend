import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "emanuela.markovic@hotmail.com",
    pass: "24031986",
  },
});

const sendSignupConfirmationEmail = async (recipientEmail, username) => {
  const mailOptions = {
    from: "emanuela.markovic@hotmail.com",
    to: recipientEmail,
    subject: "Welcome to Daily Tasks!",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Hi ${username},</h2>
    <p>Thank you for registering with <strong>Daily Tasks</strong>. We're excited to have you on board!</p>
    <p>Best regards,<br/>
    <span style="font-weight: bold;">Your Daily Tasks Team</span></p>
  </div>
  <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ccc;">
    <p style="font-size: 0.8em; color: #777;">If you did not sign up for this account, please disregard this email.</p>
  </footer>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Signup confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending signup confirmation email:", error);
    throw new Error("Failed to send signup confirmation email.");
  }
};

export { sendSignupConfirmationEmail };
