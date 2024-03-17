import express from "express";
import {
  
  getSchedule,
 
  deleteSchedule,
} from "../admin/passenger.js";

const router = express.Router();

router.post("/add", deleteSchedule);
router.get("/get", getSchedule);
export default router;
