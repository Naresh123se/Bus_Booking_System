import asyncHandler from "express-async-handler";
import  Des  from "../models/destinations.js";
import  Bus  from "../models/bus.js";
import multer from 'multer';
import path from 'path';
import cloudinary from 'cloudinary'

// const buses = asyncHandler(async (req, res) => {
// // bus.get('/buses', async (req, res) => {
//     try {
//         const buses = await Bus.find();
//         res.json(buses);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });






// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Directory where uploaded files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File name will be originalname + timestamp
//   }
// });

// const upload = multer({ storage: storage });

// const addDes = asyncHandler(async (req, res) => {
//   try {
//     // Extract data from request body
//     const { place } = req.body;

//     // Extract filenames of uploaded images from req.files
//     const selectedImages = req.files?.map(file => file.filename);


//     // Create new destination object
//     const des = await Des.create({
//       place,
//       selectedImages
//     });

//     res.status(201).json({ message: 'Destinations added successfully', data: des });
//   } catch (error) {
//     // Handle errors
//     console.error("Error adding destinations:", error);
//     res.status(500).json({ message: 'Failed to add destinations', error: error.message });
//   }
// });


const addDes = asyncHandler(async (req, res, next) => {
  try {
   
  
    
    const {place, selectedImages } = req.body;
// console.log(place, selectedImages);
   

    // checking if the images are in from of arrary or string
    if (selectedImages) {
      // Converting the image to the array if only one image is provided
      let images = [];
      console.log('I am here');
      if (typeof req.body.selectedImages === 'string') {
        images.push(req.body.selectedImages);
      } else {
        images = req.body.selectedImages;
      }

      // Now uploading the images to the cloudinary
      const imagesLinks = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: 'posts',
          crop: 'pad',
          quality: 'auto:best',
          fetch_format: 'auto',
        });

        // updating
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      console.log('image upload successfull');
      // Creating the Post
      addDes = await Des.create({
        
        place,
        selectedImages: imagesLinks
    
      });
    } 
    
    await Dec.save();
    res.status(201).json({
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch schedules', error: error.message });
  
  }
});






// Update Schedule
const updateSchedule = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, startLocation, endLocation, price } = req.body;
    
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    schedule.startTime = startTime;
    schedule.endTime = endTime;
    schedule.startLocation = startLocation;
    schedule.endLocation = endLocation;
    schedule.price = price;
    await schedule.save();

    res.status(200).json({ message: 'Schedule updated successfully', data: schedule });
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({ message: 'Failed to update schedule', error: error.message });
  }
});

const deleteSchedule = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // Log the received ID to inspect its format
    console.log("ID:", id);

    // Retrieve the schedule object
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(304).json({ message: 'Schedule not found1' });
    }

    // Delete the schedule object
    await schedule.deleteOne();

    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ message: 'Failed to delete schedule', error: error.message });
  }
});



// Get Schedule// Get Schedule
const getDes = asyncHandler(async (req, res) => {
  try {
    const des = await Des.find({});
    res.status(200).json({ data: des });
  } catch (error) {
    console.error("Error fetching des:", error);
    res.status(500).json({ message: 'Failed to fetch des', error: error.message });
  }
});


export {
  addDes,
  getDes,
  updateSchedule,
  deleteSchedule,
};