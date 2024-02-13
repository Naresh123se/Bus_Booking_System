import mongoose from "mongoose";

const googleSchema = new mongoose.Schema(
  {
    googleId: String,
    displayName: String,
    email: String,
    image: String,
  },
  { timestamps: true }
);

const Google = new mongoose.model("Google", googleSchema);

export default Google;
