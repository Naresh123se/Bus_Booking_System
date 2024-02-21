import mongoose from "mongoose";


const searchSchema = new mongoose.Schema(
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

const Search = new mongoose.model("Search", bookingSchema);

export default Search;
