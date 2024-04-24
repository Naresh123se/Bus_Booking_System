import mongoose from "mongoose";

// Define the Bus schema
const desSchema = new mongoose.Schema(
  {
    selectedImages: [{
      public_id: { type:  String, required: true },
      url: { type: String, required: true }
    }],
    place: {
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
const Des = mongoose.model("Des", desSchema);
// const Seat = mongoose.model("Seat", busseat);

export default Des;
