import asyncHandler from "express-async-handler";
import  Des  from "../models/destinations.js";
import  Bus  from "../models/bus.js";


// const buses = asyncHandler(async (req, res) => {
// // bus.get('/buses', async (req, res) => {
//     try {
//         const buses = await Bus.find();
//         res.json(buses);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

const addDes = asyncHandler(async (req, res) => {
  try {
    const { place ,selectedImages } = req.body;
    
    const des = await Des.create({
      place ,
      selectedImages
      
    });

    res.status(201).json({ message: 'Destinations added successfully', data: des });
  } catch (error) {
    // Handle errors
    console.error("Error adding destinations:", error);
    res.status(500).json({ message: 'Failed to add destinations', error: error.message });
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
    const { id } = req.params;
    // Log the received ID to inspect its format
    console.log("ID:", id);

    // Retrieve the schedule object
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(304).json({ message: 'Schedule not found1' });
    }

    // Delete the schedule object
    await schedule.deleteOne();

    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ message: 'Failed to delete schedule', error: error.message });
  }
});



// Get Schedule// Get Schedule
const getDes = asyncHandler(async (req, res) => {
  try {
    const des = await Des.find({});
    res.status(200).json({ data: des });
  } catch (error) {
    console.error("Error fetching des:", error);
    res.status(500).json({ message: 'Failed to fetch des', error: error.message });
  }
});


export {
  addDes,
  getDes,
  updateSchedule,
  deleteSchedule,
};