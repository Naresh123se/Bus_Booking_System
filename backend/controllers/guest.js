import asyncHandler from "express-async-handler";

import  Guest  from "../models/guest";


const addguest = asyncHandler(async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      const schedule = await Guest.create({
        name, email, message
      });
  
      res.status(201).json({ message: 'Guest added successfully', data: schedule });
    } catch (error) {
      // Handle errors
      console.error("Error adding schedule:", error);
      res.status(500).json({ message: 'Failed to add Guest', error: error.message });
    }
  });

  export {
    addguest,
  };