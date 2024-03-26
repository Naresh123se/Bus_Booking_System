import mongoose from "mongoose";

const busseat = new mongoose.Schema(
  {
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seseats: [Number],
  },
  {
    timestamps: true,
  }
);
const Seat = mongoose.model("Seat", busseat);
export default Seat;
