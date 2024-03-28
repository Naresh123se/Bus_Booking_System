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
},
{
  timestamps: true,
}

);

// Define the Schedule schema

// Define the Schedule model
const Bus = mongoose.model("Bus", busSchema);
// const Seat = mongoose.model("Seat", busseat);

export default Bus;
