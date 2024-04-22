
import asyncHandler from "express-async-handler";
import Seat from "../models/ticket.js";
const createTicket = async (req, res) => {
    try {
      const ticket = await Seat.create(req.body);
      res.status(201).json({ success: true, ticket });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


  // Controller function to retrieve all tickets
  const getAllTickets = asyncHandler(async (req, res) => {
  try {
    const tickets = await Seat.find({}).populate('SchId');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export {createTicket , getAllTickets};
