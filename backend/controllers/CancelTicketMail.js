import nodemailer from "nodemailer";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import Ticket from "../models/ticket.js";


dotenv.config();
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

if (!EMAIL_USERNAME || !EMAIL_PASSWORD) {
  console.error("Email credentials not provided.");
  process.exit(1); // Exit the process if email credentials are missing
}


//cancel
const CancelTicketMail = asyncHandler(async (req, res) => {
  const { email, cal, se, p, tick, userName, bus } = req.body;
  console.log(email, cal, se, p, tick, userName, bus);
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
      subject: "Ticket Cancellation and Refund Confirmation",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Ticket Cancellation and Refund Confirmation</title>
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
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8;">Name</th>
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8;">Ticket No</th>
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8;">Date</th>
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8;">Total Price</th>
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8;">Bus Number</th>
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8;">Seat Number</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td style="padding: 10px; border: 1px solid #ddd;">${userName}</td>
                                  <td style="padding: 10px; border: 1px solid #ddd;">${tick}</td>
                                  <td style="padding: 10px; border: 1px solid #ddd;">${cal}</td>
                                  <td style="padding: 10px; border: 1px solid #ddd;">Rs.${p}</td>
                                  <td style="padding: 10px; border: 1px solid #ddd;">${bus}</td>
                                  <td style="padding: 10px; border: 1px solid #ddd;">${se}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
              <div style=" margin-top: 20px;">
                  Thank You !!! <br>
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
    res
      .status(200)
      .json({ success: true, message: " Ticket  Cancel Successfully" });
    // Send response back to the client
  } catch (error) {
    console.error("Error sending Cancel email:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message }); // Send error response back to the client
  }
});



//booking

const BookingTicketMail = asyncHandler(async (req, res) => {
  const { email, userName, ticket1212, BusName1212,price1212, bus1212, seat1212  } = req.body;
  console.log(email, userName, ticket1212, BusName1212,price1212, bus1212, seat1212)

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
      subject: "Ticket Booking Confirmation",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f0f4f8; margin: 0; padding: 0; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
              <div style="text-align: center;">
                  <img src="https://res.cloudinary.com/busbookingsystem/image/upload/fl_preserve_transparency/v1716319455/LOGO/3n_py9tak.jpg?_s=public-apps" alt="Bus Image" style="width: 100px; height: auto; margin: 10px 0;">
                  <h3 style="font-size: 24px; margin: 10px 0; color: #009DF8;">Ticket Booking Confirmation</h3>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                  <p>Hello ${userName},</p>
                  <p>Thank you for booking with us! Here are your booking details:</p>
                  <div style="width: 100%; overflow-x: auto; margin-top: 20px;">
                      <table style="width: 100%; border-collapse: collapse;">
                          <thead>
                              <tr>
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8; color: #fff;">Name</th>
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8; color: #fff;">Ticket No</th>
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8; color: #fff;">BUs Name</th>
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8; color: #fff;">Total Price</th>
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8; color: #fff;">Bus Number</th>
                                  <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #009DF8; color: #fff;">Seat Number</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td style="padding: 10px; border: 1px solid #ddd;">${userName}</td>
                                  <td style="padding: 10px; border: 1px solid #ddd;">${ticket1212}</td>
                                  <td style="padding: 10px; border: 1px solid #ddd;">${BusName1212}</td>
                                  <td style="padding: 10px; border: 1px solid #ddd;">Rs.${price1212}</td>
                                  <td style="padding: 10px; border: 1px solid #ddd;">${bus1212}</td>
                                  <td style="padding: 10px; border: 1px solid #ddd;">${seat1212}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                  <p style="font-size: 14px; color: #666;">If you have any questions, contact us at <a href="mailto:merobus3@gmail.com" style="color: #007bff; text-decoration: none;">support@merobus</a></p>
              </div>
          </div>
      </body>
      </html>
      
      `,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: " Ticket  Cancel Successfully" });
    // Send response back to the client
  } catch (error) {
    console.error("Error sending Cancel email:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message }); // Send error response back to the client
    }
  });
// dell
const deleteTicketMail = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // Log the received ID to inspect its format
    console.log("ID:", id);
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    await Ticket.deleteOne();

    res.status(200).json({ message: "Ticket Cancel successfully" });
  } catch (error) {
    console.error("Error Cancel Ticket:", error);
    res
      .status(500)
      .json({ message: "Failed to Cancel Ticket", error: error.message });
  }
});
export { CancelTicketMail, deleteTicketMail, BookingTicketMail };
