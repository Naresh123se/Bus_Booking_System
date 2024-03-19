import asyncHandler from "express-async-handler";
import Bus from "../models/bus.js";

const Buses = asyncHandler(async (req, res) => {
  // Extract parameters from the request body or query parameters
  const { region1, lot, number, alphabet, capacity, seat } = req.body;

    if (!seat || seat.length === 0) {
      res.status(400);
      throw new Error("Selected seats array is empty11");
    }

  try {
    // console.log('Selected Seats:', selectedSeats);
    const bus = await Bus.create({
      region1,
      lot,
      number,
      alphabet,
      capacity,
      seat
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

//@get buses
const busget = asyncHandler(async (req, res) => {
  try {
    const users = await Bus.find({});
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});


const updateBus= asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { region1, lot, number, alphabet, capacity, seat } = req.body;
    
    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    bus.region1 = region1;
    bus.lot = lot;
    bus.number = number;
    bus.alphabet = alphabet;
    bus.capacity = capacity;
    bus.seat = seat;
    await bus.save();

    res.status(200).json({ message: 'Schedule updated successfully', data: bus });
  } catch (error) {
    console.error("Error updating bus:", error);
    res.status(500).json({ message: 'Failed to update bus', error: error.message });
  }
});




export { Buses, busget, updateBus };
