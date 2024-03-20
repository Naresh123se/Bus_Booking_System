import asyncHandler from "express-async-handler";
import Seat from "../models/seat.js";

const seat = asyncHandler(async (req, res) => {
  // Extract parameters from the request body or query parameters
  const { selectedSeats, userId } = req.body;


console.log

  try {
    // console.log('Selected Seats:', selectedSeats);
    const seat = await Seat.create({
      selectedSeats,
      userId,
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
      .json({ success: false, error: "Internal Server Error" });
  }
});

export { seat };
