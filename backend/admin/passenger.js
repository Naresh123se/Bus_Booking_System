import asyncHandler from "express-async-handler";
import passenger from "../models/userModel.js";



const deleteSchedule = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Log the received ID to inspect its format
    console.log("ID:", id);

    // Retrieve the schedule object
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Delete the schedule object
    await schedule.deleteOne();

    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ message: 'Failed to delete schedule', error: error.message });
  }
});


// Get Schedule
const getSchedule = asyncHandler(async (req, res) => {
  try {
    const users = await passenger.find({});
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});
export {
  
  getSchedule,

  deleteSchedule,
};
