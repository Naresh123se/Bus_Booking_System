import asyncHandler from "express-async-handler";
import Bus from "../models/bus.js";
import cloudinary from "cloudinary";


const Buses = asyncHandler(async (req, res) => {
  // Extract parameters from the request body or query parameters
  const { name1 , region1, lot, number, alphabet, capacity,selectedImages } = req.body;
  console.log(name1 , region1, lot, number, alphabet, capacity, selectedImages )

    if (!capacity || capacity.length === 0) {
      res.status(400);
      throw new Error("EMPTY");
    }
    try {

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
          folder: "buses",
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
    const bus = await Bus.create({
      name1,
      region1,
      lot,
      number,
      alphabet,
      capacity,
      selectedImages: imagesLinks,
    });
  }

    // Send back the result to the client
    return res
      .status(200)
      .json({ success: true, message: "Received selected seats successfully" });
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error in user controller:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});

//@get buses
const busget = asyncHandler(async (req, res) => {
  try {
    const users = await Bus.find({});
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});


// del
const deleteBus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // Log the received ID to inspect its format
    console.log("ID:", id);

    // Retrieve the schedule object
    const schedule = await Bus.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Delete the schedule object
    await schedule.deleteOne();
    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ message: 'Failed to delete schedule', error: error.message });
  }
});


//edit
const updateBus= asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name1 ,capacity,  region1, lot, number, alphabet } = req.body;
    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    bus.name1 = name1;
    bus.region1 = region1;
    bus.lot = lot;
    bus.number = number;
    bus.alphabet = alphabet;
    bus.capacity = capacity;
    await bus.save();
    res.status(200).json({ message: 'Schedule updated successfully', data: bus });
  } catch (error) {
    console.error("Error updating bus:", error);
    res.status(500).json({ message: 'Failed to update bus', error: error.message });
  }
});


// @get totalBuses
const totalBuses = asyncHandler(async (req, res) => {
  try {
    // Fetch the count of documents in the User collection
    const count = await Bus.countDocuments();
    // Send the count as JSON response
    res.status(200).json({ count });
  } catch (error) {
    // If there's an error, log it and send an error response
    console.error("Error counting users:", error);
    res.status(500).json({ message: "Failed to count users", error: error.message });
  }
});

export { Buses, busget, updateBus, deleteBus, totalBuses };
