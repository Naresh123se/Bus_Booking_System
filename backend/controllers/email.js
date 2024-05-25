import nodemailer from "nodemailer";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

dotenv.config();
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

if (!EMAIL_USERNAME || !EMAIL_PASSWORD) {
  console.error("Email credentials not provided.");
  process.exit(1); // Exit the process if email credentials are missing
}

const Email = asyncHandler(async (req, res) => {
  const { email, name, subject, message } = req.body;
  console.log(email, name, subject, message);
  try {
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
      subject: subject,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f0f4f8; margin: 0; padding: 0;">
          <img src="https://res.cloudinary.com/busbookingsystem/image/upload/fl_preserve_transparency/v1716319455/LOGO/3n_py9tak.jpg?_s=public-apps" alt="Bus Image" style="width: 100px; height: auto; margin-left: 46%; margin-top: 10px;">
          <div style="max-width: 1400px; margin: 0 auto; padding: 20px;">
          Dear ${name}, ${message}
          <div style="padding-top: 2%;">
              Thank You !!!
          </div>
          <div style="text-align: center; margin-top: 20px;">
          <p style="font-size: 14px; color: #666;">If you have any questions, <br/>contact us at <a href="mailto:merobus3@gmail.com" style="color: #007bff; text-decoration: none;">support@merobus</a></p>
      </div>
          </div>
      </body>
      </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200) .json({ success: true, message: "Email send successfully" }); // Send response back to the client
  } catch (error) {
    console.error("Error sending Cancel email:", error);
    res.status(500)
      .json({ message: "Failed to send email", error: error.message }); // Send error response back to the client
  }
});

export { Email };
