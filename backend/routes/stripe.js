import express from "express";
import {
    getStripeKey,
    newPayment,

} from "../controllers/stripe.js";
const router = express.Router();
router.post("/payment",newPayment);
router.get("/getStripeKey",getStripeKey);
export default router;
