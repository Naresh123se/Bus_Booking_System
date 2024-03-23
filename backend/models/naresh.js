// models.js

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
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  // Add more fields as needed
});

// Define the Bus model
const Bus = mongoose.model("Bus", busSchema);

// Define the Schedule model
const Schedule11 = mongoose.model("Schedule11", scheduleSchema);

export { Bus, Schedule11 };
