import asyncHandler from "express-async-handler";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const getStripeKey = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "success",
    key: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

const newPayment = asyncHandler(async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: "usd",
      metadata: {
        company: "Bus_booking_system",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res
      .status(200)
      .json({ message: "success", client_secret: paymentIntent.client_secret });
  } catch (error) {
    return next(new Error("Payment failed"));
  }
});

export { getStripeKey, newPayment };
