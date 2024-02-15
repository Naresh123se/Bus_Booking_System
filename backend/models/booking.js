import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema(
  {
    name: String,
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User" // This should match the model name of your User schema
    },
    displayName: String,
    email: String,
    image: String,
  },
  { timestamps: true }
);

const Booking = new mongoose.model("Booking", bookingSchema);

export default Booking;
