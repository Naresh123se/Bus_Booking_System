import mongoose from "mongoose";

// Define the Bus schema
const busSchema = new mongoose.Schema({
  name1: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  region1: {
    type: String,
    required: true,
  },
  lot: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  alphabet: {
    type: String,
    required: true,
  },
});

// Define the Schedule schema
const scheduleSchema = new mongoose.Schema({
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
});

// Define the Bus model
const Bus = mongoose.model("Bus", busSchema);

// Define the Schedule model
const Schedule = mongoose.model("Schedule", scheduleSchema);

export { Bus, Schedule };
