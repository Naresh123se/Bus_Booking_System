import asyncHandler from "express-async-handler";

const bookingdata = asyncHandler(async (req, res) => {
  // Extract parameters from the request body or query parameters
  const { fromLocation, toLocation, value, value1, bike, count, } = req.body;
  console.log(fromLocation, toLocation);

  // Validate parameters
  if (!fromLocation || !toLocation || !value || isNaN(Date.parse(value))) {
    return res.status(400).json({ error: "Locations or date are invalid" });
  }

  try {
    // Print the extracted values in the console
    console.log("fromLocation:", fromLocation);
    console.log("toLocation:", toLocation);
    console.log("value:", value);
    console.log("value1:", value1);
    console.log("bike:", bike);
    console.log("count:", count);

    // Send back the result to the client
    res.status(200).json({
      success: true,
      message: "Verification successful",
      verificationStatus: "success",
      fromLocation: fromLocation,
      toLocation: toLocation,
      value: value,
      value1: value1,
      bike: bike,
      count: count,
    });

  } catch (error) {
    // If there's an error, send an error response
    console.error("Error in user controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { bookingdata };
