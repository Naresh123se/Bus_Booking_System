import asyncHandler from "express-async-handler";
import Seat from "../models/seat.js";

const seat = asyncHandler(async (req, res) => {
  const data11 = req.body;
  try {
    const seat = await Seat.create({
      schedule: data11.SchId,
      user: data11.userId,
      seseats: data11.seat,
    });
    return res
      .status(200)
      .json({ success: true, message: "Received selected seats successfully" });
  } catch (error) {
    console.error("Error in user controller:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});

//@get seat
const seatget = asyncHandler(async (req, res) => {
  try {
    const users = await Seat.find({});
    res.setHeader("Cache-Control", "no-cache"); // Set Cache-Control header
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
});

export { seat, seatget };
