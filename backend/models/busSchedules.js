// Import mongoose
import mongoose from "mongoose";

// Define the schema for the Item model
const busSchedules = new mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    startLocation: {
      type: String,
      required: true,
    },
    endLocation: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// Define the Bus model

// Create the Item model based on the schema
const Schedule = mongoose.model("Schedule", busSchedules);

// Export the Item model
export default Schedule;