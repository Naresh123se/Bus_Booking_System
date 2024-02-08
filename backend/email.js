import nodemailer from "nodemailer";
import dotenv from "dotenv";
import express from "express";
import otherToken from "./utils/otherToken.js";

dotenv.config();
const app = express();

const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

if (!EMAIL_USERNAME || !EMAIL_PASSWORD) {
  console.error("Email credentials not provided.");
  process.exit(1); // Exit the process if email credentials are missing
}

const sendVerificationEmail = async (email, userId) => {
  try {
    const token = otherToken(userId); // Generate token here
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL_USERNAME,
      to: email,
      subject: "Verify Your Email",
      html: `Click the following link to verify your email: <a href="http://localhost:4000?id=${userId}">Verify Email</a>`,

    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("An error occurred while sending verification email");
  }
};

// const verifyEmail = async (req, res) => {
//   try {
//     const userId = req.query.id;
//     const updateInfo = await User.updateOne(
//       { _id: userId, is_verify: 0 }, // Ensure the user is not already verified
//       { $set: { is_verify: 1 } }
//     );

//     if (updateInfo.nModified === 0) {
//       return res.status(400).json({ success: false, message: "Invalid verification link" });
//     }

//     res.json({ success: true, message: "Email successfully verified" });
//   } catch (err) {
//     console.error("Error verifying email:", err);
//     res.status(500).json({ success: false, message: "An error occurred while verifying email" });
//   }
// };



export { app, sendVerificationEmail };
