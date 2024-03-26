import asyncHandler from "express-async-handler";
import Seat from "../models/seat.js";

const seat = asyncHandler(async (req, res) => {
  // Extract parameters from the request body or query parameters
  const { ScId, userId, seseats } = req.body;

  try {
    // console.log('Selected Seats:', selectedSeats);
    const seat = await Seat.create({
      schedule: ScId,
      user: userId,
      seseats,
    });

    // Send back the result to the client
    return res
      .status(200)
      .json({ success: true, message: "Received selected seats successfully" });
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error in user controller:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internalqq Server Error" });
  }
});

//@get seat
const seatget = asyncHandler(async (req, res) => {
  try {
    const users = await Seat.find({});
    res.setHeader('Cache-Control', 'no-cache'); // Set Cache-Control header
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

export { seat, seatget };
