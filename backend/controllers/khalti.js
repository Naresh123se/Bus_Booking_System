import asyncHandler from 'express-async-handler';
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const khalti = asyncHandler(async (req, res) => {
  const { token, amount } = req.body;
  console.log(token, amount); // Corrected logging statement

  let data = {
    token: token,
    amount: amount
  };

  let config = {
    headers: {'Authorization': 'process.env.GOOGLE_CLIENT_ID,'} // Corrected Authorization header
  };

  try {
    const verificationResponse = await axios.get("https://khalti.com/api/v2/payment/verify/", data, config);
    console.log(verificationResponse.data); // Logging verification response
    res.status(200).json(verificationResponse.data); // Sending verification response to client
  } catch (error) {
    console.error("Error occurred during payment verification:", error);
    res.status(500).json({ error: 'An error occurred while verifying payment.' });
  }
});

export { khalti };
