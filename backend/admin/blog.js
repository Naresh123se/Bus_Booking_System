import asyncHandler from "express-async-handler";
import Blog from "../models/blog.js";

import cloudinary from "cloudinary";
//add
const addBlog = asyncHandler(async (req, res) => {
  try {
    const { title, category, selectedImages, blogText, author } = req.body;
    console.log(title, category, selectedImages, blogText, author);

    // checking if the images are in from of arrary or string
    if (selectedImages) {
      // Converting the image to the array if only one image is provided
      let images = [];
      console.log("I am here");
      if (typeof req.body.selectedImages === "string") {
        images.push(req.body.selectedImages);
      } else {
        images = req.body.selectedImages;
      }

      // Now uploading the images to the cloudinary
      const imagesLinks = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "blogs",
          crop: "pad",
          quality: "auto:best",
          fetch_format: "auto",
        });

        // updating
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      console.log("image upload successful");
      // Creating the Post
      const addDes = await Blog.create({
        Title: title,
        Blog: blogText,
        Author: author,
        selectedImages: imagesLinks,
        Category: category,
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch schedules", error: error.message });
  }
});

//@get
const getBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.find({});
    res.status(200).json({ data: blog });
  } catch (error) {
    console.error("Error fetching Blog:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch Blog", error: error.message });
  }
});

// dell
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Log the received ID to inspect its format
    console.log("ID:", id);

    // Retrieve the Blog object
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the Blog object
    await Blog.deleteOne();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting Blog:", error);
    res
      .status(500)
      .json({ message: "Failed to delete Blog", error: error.message });
  }
});

//edit

const updateBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, selectedImages, blogText, author } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    Blog.Title=title;
    Blog.Blog = blogText;
    Blog.Author = author;
    Blog.selectedImages =  imagesLinks;
    Blog.Category=category;

    await blog.save();

    res
      .status(200)
      .json({ message: "Schedule updated successfully", data: blog });
  } catch (error) {
    console.error("Error updating bus:", error);
    res
      .status(500)
      .json({ message: "Failed to update bus", error: error.message });
  }
});

export { addBlog, updateBlog, deleteBlog, getBlog };
