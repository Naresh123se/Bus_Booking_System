
import asyncHandler from "express-async-handler";
import { Bus11 } from "../models/naresh.js";
// Get all buses

const na = asyncHandler(async (req, res) => {
    try {
        const buses = await Bus11.find();
        res.json(buses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new bus
const nar = asyncHandler(async (req, res) => {
    try {
        const { name, type, capacity } = req.body;
        const newBus = new Bus11({ name, type, capacity });
        await newBus.save();
        res.status(201).json(newBus);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
const busdel = asyncHandler(async (req, res) => {
    try {
      const busId = req.params.id;
      console.log("Bus ID:", busId); // Add console log here
      await Bus11.findByIdAndDelete(busId);
      res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
export { na, nar, busdel };
