import express from "express";
import {
  bookingdata,
} from "../controllers/busController.js";


const router = express.Router();
router.post("/dire", bookingdata);
export default router;
