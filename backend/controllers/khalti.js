import asyncHandler from "express-async-handler";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const khalti = asyncHandler(async (req, res) => {
  const { amount, customerName, customerEmail, customerPhone } = req.body;
  console.log(amount, customerName, customerEmail, customerPhone);
  const requestData = {
    return_url: "http://localhost:4000/completion",
    website_url: "http://localhost:4000/payment",
    amount: amount * 100,
    purchase_order_id: "Order01",
    purchase_order_name: "test",
    customer_info: {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    },
  };

  const config = {
    headers: {
      Authorization: process.env.KHALTI_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      requestData,
      config
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while initiating payment." });
  }
});

export { khalti };
