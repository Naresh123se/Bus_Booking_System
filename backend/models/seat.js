import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    selectedSeats: [Number],
  },
  { timestamps: true }
);

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;
  