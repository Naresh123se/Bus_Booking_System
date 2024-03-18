
import asyncHandler from "express-async-handler";
import Bus from "../models/bus.js";

const bus = asyncHandler(async (req, res) => {
  
  // Extract parameters from the request body or query parameters
  const {region, lot, number, alphabet, capacity, seat} = req.body;
  console.log(region, lot, number, alphabet, capacity, seat);

  // if (!seat || seat.length === 0) {
  //   res.status(400);
  //   throw new Error("Selected seats array is empty11");
  // }


  try {
    // console.log('Selected Seats:', selectedSeats);
    const seat = await Bus.create({
      region,
      lot,
      number,
      alphabet,
      capacity,
      seat,
    });

    // Send back the result to the client
    return res
      .status(200)
      .json({ success: true, message: "Bus added successfully" });
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error in user controller:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error11" });
  }
});

const busget = asyncHandler(async (req, res) => {
  try {
    const users = await Bus.find({});
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching bus:", error);
    res.status(500).json({ message: 'Failed to fetch bus', error: error.message });
  }
});

export { bus, busget };
