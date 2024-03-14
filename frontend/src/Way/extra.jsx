import asyncHandler from "express-async-handler";
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const initiatePayment = asyncHandler(async (req, res) => {
    try {
        const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', {
            public_key: "live_public_key_546eb6da05544d7d88961db04fdb9721",
            mobile: "9842911442",
            transaction_pin: "9563",
            amount: 10000,
            product_identity: "book/id-120",
            product_name: "A Song of Ice and Fire",
            product_url: "http://bookexample.com"
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { khalti };
