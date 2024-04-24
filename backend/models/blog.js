import mongoose from "mongoose";

// Define the Bus schema
const blogSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  selectedImages: [{
    public_id: { type:  String, required: true },
    url: { type: String, required: true }
  }],
  
  Blog: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  }
},
{
  timestamps: true,
}

);

// Define the Schedule schema

// Define the Schedule model
const Blog = mongoose.model("Blog", blogSchema);
// const Seat = mongoose.model("Seat", busseat);

export default Blog;
