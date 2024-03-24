import asyncHandler from "express-async-handler";
import {Bus, Schedule} from "../models/naresh.js";


// const buses = asyncHandler(async (req, res) => {
// // bus.get('/buses', async (req, res) => {
//     try {
//         const buses = await Bus.find();
//         res.json(buses);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

const addSchedule = asyncHandler(async (req, res) => {
  try {
    const { busId, startTime, endTime, startLocation, endLocation, price } = req.body;
    
    const bus = await Bus.findById(busId);
    if (!bus) {
        return res.status(400).json({ error: 'Selected bus does not exist' });
    }

    const schedule = await Schedule.create({
      bus: busId,
      startTime,
      endTime,
      startLocation,
      endLocation,
      price,
    });

    res.status(201).json({ message: 'Schedule added successfully', data: schedule });
  } catch (error) {
    // Handle errors
    console.error("Error adding schedule:", error);
    res.status(500).json({ message: 'Failed to add schedule', error: error.message });
  }
});


// Update Schedule
const updateSchedule = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, startLocation, endLocation, price } = req.body;
    
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    schedule.startTime = startTime;
    schedule.endTime = endTime;
    schedule.startLocation = startLocation;
    schedule.endLocation = endLocation;
    schedule.price = price;
    await schedule.save();

    res.status(200).json({ message: 'Schedule updated successfully', data: schedule });
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({ message: 'Failed to update schedule', error: error.message });
  }
});

const deleteSchedule = asyncHandler(async (req, res) => {
  try {
    const { ids } = req.body; // Assuming you're sending an array of schedule IDs in the request body
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new Error('Please provide at least one schedule ID to delete.');
    }

    // Loop through each schedule ID and delete it
    await Promise.all(ids.map(async (id) => {
      const schedule = await Schedule.findById(id);
      if (!schedule) {
        console.error(`Schedule with ID ${id} not found.`);
        return; // Skip deletion if schedule not found
      }
      await schedule.deleteOne();
    }));

    res.status(200).json({ message: 'Selected schedules deleted successfully' });
  } catch (error) {
    console.error('Failed to delete selected schedules:', error);
    res.status(500).json({ message: error.message || 'Failed to delete selected schedules' });
  }
});



// Get Schedule// Get Schedule
const getSchedule = asyncHandler(async (req, res) => {
  try {
    const schedules = await Schedule.find({}).populate('bus');
    res.status(200).json({ data: schedules });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ message: 'Failed to fetch schedules', error: error.message });
  }
});

export {
  addSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
};