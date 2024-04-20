import asyncHandler from "express-async-handler";
import Seat from "../models/seat.js";

const seat = asyncHandler(async (req, res) => {
  // Extract parameters from the request body or query parameters
  // const { ScId, userId, seseats } = req.body;
  const data11 = req.body;
  
   console.log(data11.SchId);

  try {
    // console.log('Selected Seats:', selectedSeats);
    const seat = await Seat.create({
      schedule:data11.SchId,
      user:data11.userId,
      seseats:data11.seat,
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


// const seat = asyncHandler(async (req, res) => {
//   try {
//       // Extract the data11 object from the request body
//       const data11 = req.body;

//       // Log the data received from the client
//       console.log(data11.SchId);

//       // Your further processing logic goes here

//       // Send a response if needed
//       res.status(200).json({ message: 'Data received successfully' });
//   } catch (error) {
//       // Handle errors if any
//       console.error('Error:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// });

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
