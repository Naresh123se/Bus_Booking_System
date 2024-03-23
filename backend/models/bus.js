import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    name1: { type: String, required: true },
    capacity: { type: String, required: true },
    region1: {
      type: String,
      required: true,
    },
    lot: { type: String, required: true },
    number: { type: Number, required: true },
    alphabet: { type: String, required: true },
  },
  { timestamps: true }
);

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
