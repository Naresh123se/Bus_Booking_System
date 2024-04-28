import asyncHandler from "express-async-handler";
import Coupons from "../models/coupons.js";

import cloudinary from "cloudinary";
//add
const addCoupons = asyncHandler(async (req, res) => {
  try {
    const { description, time, selectedImages, copy, disPrices, bg } = req.body;
    console.log(bg);

    if (selectedImages) {
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
          folder: "coupons",
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
      const addCoupons = await Coupons.create({
        description,
        time,
        selectedImages: imagesLinks,
        disPrices,
        copy,
        bg
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Coupons", error: error.message });
  }
});

//@get
const getCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupons.find({});
    res.status(200).json({ data: coupons });
  } catch (error) {
    console.error("Error fetching Coupons:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch Coupons", error: error.message });
  }
});

// dell
const deleteCoupons = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // Log the received ID to inspect its format
    console.log("ID:", id);
    const blog = await Coupons.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Coupons not found" });
    }
    await Coupons.deleteOne();

    res.status(200).json({ message: "Coupons deleted successfully" });
  } catch (error) {
    console.error("Error deleting Coupons:", error);
    res
      .status(500)
      .json({ message: "Failed to delete Coupons", error: error.message });
  }
});

//edit
const updateCoupons = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {  description, time, copy, disPrices} = req.body;
    

    const coupons = await Coupons.findById(id);
    if (!coupons) {
      return res.status(404).json({ message: "Coupons not found" });
    }
    
    coupons.description = description;
    coupons.time = time;
    coupons.copy = copy;
    coupons.disPrices = disPrices;
    await coupons.save();

    res
      .status(200)
      .json({ message: "Coupons updated successfully", data: coupons });
  } catch (error) {
    console.error("Error updating coupons:", error);
    res
      .status(500)
      .json({ message: "Failed to update coupons", error: error.message });
  }
});

export { addCoupons, updateCoupons, deleteCoupons, getCoupons };
