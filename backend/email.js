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
      html: `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
      </head>
      
      <body style="font-family: Arial, sans-serif; background-color: #f0f4f8; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center;">
                  <h3 style="font-size: 24px; color: #333;">Thanks for signing up for merobus</h3>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                  <p style="font-size: 16px; color: #666; margin-top: 20px;">We're happy you're here. Let's get your email address verified:</p>
              </div>
             
              <div style="text-align: center; margin-top: 20px;">
                  <a href="http://localhost:4000?id=${userId}" style="background-color: #009DF8; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; cursor: pointer; border-radius: 4px;">Click to Verify Email</a>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                  <p style="font-size: 14px; color: #666;">If you have any questions, <br/>contact us at <a href="mailto:support@anywheel.sg" style="color: #007bff; text-decoration: none;">support@anywheel.sg</a></p>
              </div>
          </div>
      </body>
      
      </html>
      

      `,
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
