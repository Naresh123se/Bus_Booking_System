import mongoose from "mongoose";

// Define the Coupons schema
const couponsSchema = new mongoose.Schema({
    description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  selectedImages: [{
    public_id: { type:  String, required: true },
    url: { type: String, required: true }
  }],
  copy: {
    type: String,
    required: true,
  },
  disPrices: {
    type: String,
    required: true,
  }
},
{
  timestamps: true,
}
);
// Define the Schedule model
const Coupons = mongoose.model("Coupons", couponsSchema);
// const Seat = mongoose.model("Seat", busseat);

export default Coupons;
