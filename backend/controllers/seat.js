
import asyncHandler from "express-async-handler";
import Seat from "../models/seat.js";

const seat = asyncHandler(async (req, res) => {
  // Extract parameters from the request body or query parameters
  const selectedSeats = req.body;

  if (!selectedSeats || selectedSeats.length === 0) {
    res.status(400);
    throw new Error("Selected seats array is empty11");
  }

  try {
    // console.log('Selected Seats:', selectedSeats);
    const seat = await Seat.create({
      selectedSeats,
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

const seatget = asyncHandler(async (req, res) => {
  try {
    const users = await Seat.find({});
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching Seats:", error);
    res.status(500).json({ message: 'Failed to fetch Seats', error: error.message });
  }
});

export { seat, seatget };
