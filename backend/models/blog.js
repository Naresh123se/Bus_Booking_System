import mongoose from "mongoose";

// Define the Bus schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  selectedImages: [{
    public_id: { type:  String, required: true },
    url: { type: String, required: true }
  }],
  
  blogText: {
    type: String,
    required: true,
  },
  author: {
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
