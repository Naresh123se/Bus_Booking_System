
import asyncHandler from "express-async-handler";
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

// import Seat from "../models/seat.js";

const khalti = asyncHandler(async (req, res) => {
    try {
        const response = await axios.post('https://khalti.com/api/v2/payment/initiate', {
          amount: req.body.amount,
          productIdentity: req.body.productIdentity,
          productName: req.body.productName,
          // Add other required parameters here
        }, {
          headers: {
            Authorization: 'test_secret_key_ae5daffa00254fff9ff1f2c428d10634', // Replace with your test secret key
          }
        });
    
        res.json(response.data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  
});

export { khalti };
