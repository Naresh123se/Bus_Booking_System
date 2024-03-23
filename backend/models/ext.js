import mongoose from "mongoose";

// Define the schema for selected seats
const selectedSeatSchema = new mongoose.Schema({
  selectedSeats: [Number],
  userId: { type: String, required: true },
});

// Define the schema for bus schedules
const busSchedulesSchema = new mongoose.Schema(
  {
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
    // Reference to the selected seat document
    selectedSeats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Selected' }],
    userId: { type: String, required: true }, // Directly define userId in bus schedules schema
  },
  {
    timestamps: true,
  }
);

// Define the models
const BusSchedule = mongoose.model("BusSchedule", busSchedulesSchema);
const Selected = mongoose.model("Selected", selectedSeatSchema);

export { BusSchedule, Selected };
