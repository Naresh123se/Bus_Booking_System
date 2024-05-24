import asyncHandler from "express-async-handler";
import axios from "axios";

const khalti_com = asyncHandler(async (req, res) => {
  const { pidx } = req.body;
  const config = {
    headers: {
      Authorization: process.env.KHALTI_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      config
    );
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while initiating payment." });
  }
});

export { khalti_com };
