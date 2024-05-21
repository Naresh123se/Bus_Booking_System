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

const CancelTicketMail = asyncHandler(async (req, res) => {
  const { email,cal,se,p,tick,userName,bus } = req.body;
  console.log(email);
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
      subject: " Ticket Cancellation and Refund Confirmation",
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
                   <img src="https://res.cloudinary.com/busbookingsystem/image/upload/fl_preserve_transparency/v1716319455/LOGO/3n_py9tak.jpg?_s=public-apps" alt="Bus Image" style="width: 100px; height: auto; margin-left: 46%; margin-top: 10px;">
                 <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center;">
                  <h3 style="font-size: 24px; color: #333;">Your Ticket Cancellation and Refund Confirmation</h3>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                 
 
              <div style="width: 100%; overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #f2f2f2;">Name</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #f2f2f2;">Ticket No</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #f2f2f2;"> Date</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #f2f2f2;">Total Price</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #f2f2f2;">Bus Name</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #f2f2f2;">Seat Number</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">${userName}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${tick}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${cal}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${p}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${bus}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${se}</td>
                </tr>
            </tbody>
        </table>
    </div>




              </div>
             
              <div style="text-align: center; margin-top: 20px;">

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
    return true; // Return true if email is sent successfully
  } catch (error) {
    console.error("Error sending Cancel email:", error);
    return false; // Return false if there's an error sending the email
  }
});

export { CancelTicketMail };
