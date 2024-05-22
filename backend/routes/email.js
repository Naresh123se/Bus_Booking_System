import express from "express";
import {
  CancelTicketMail,
  deleteTicketMail,
} from "../controllers/CancelTicketMail.js";

const router = express.Router();
router.post("/cancelMail", CancelTicketMail);
router.delete("/cancel/:id", deleteTicketMail);

export default router;
