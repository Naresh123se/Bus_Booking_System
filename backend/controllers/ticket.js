
import asyncHandler from "express-async-handler";
import Ticket from "../models/ticket.js";
const createTicket = async (req, res) => {
    try {
      const ticket = await Ticket.create(req.body);
      res.status(201).json({ success: true, ticket });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


  // Controller function to retrieve all tickets
  const getAllTickets = asyncHandler(async (req, res) => {
  try {
    const tickets = await Ticket.find({}).populate('SchId').populate('userId');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @get totalTickets
const totalTickets = asyncHandler(async (req, res) => {
  try {
    // Fetch the count of documents in the User collection
    const count = await Ticket.countDocuments();

    // Send the count as JSON response
    res.status(200).json({ count });
  } catch (error) {
    // If there's an error, log it and send an error response
    console.error("Error counting Tickets:", error);
    res.status(500).json({ message: "Failed to count Tickets", error: error.message });
  }
});


export {createTicket , getAllTickets, totalTickets};
