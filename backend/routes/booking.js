import express from "express";
import {
  bookingdata,
} from "../controllers/busController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/dire", bookingdata);




export default router;
