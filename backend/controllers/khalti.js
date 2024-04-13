import asyncHandler from "express-async-handler";
import axios from 'axios';

const khalti = asyncHandler(async (req, res) => {
  const {amount } = req.body;
  console.log(amount)
  const requestData = {
    return_url: "http://localhost:4000/confirmation",
    website_url: "http://localhost:4000/payment",
    amount: amount*100,
    purchase_order_id: "Order01",
    purchase_order_name: "test",
    customer_info: {
      name: "Ram Bahadur",
      email: "test@khalti.com",
      phone: "9800000001"
    }
  };

  const config = {
    headers: {
      'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', requestData, config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while initiating payment.' });
  }
});

export { khalti };
