import express from "express";
import {
  CancelTicketMail,
  deleteTicketMail,
  BookingTicketMail,
} from "../controllers/CancelTicketMail.js";
import { Email } from "../controllers/email.js";

const router = express.Router();
router.post("/cancelMail", CancelTicketMail);
router.post("/bookingMail", BookingTicketMail);
router.delete("/cancel/:id", deleteTicketMail);
router.post("/send-email", Email);

export default router;
