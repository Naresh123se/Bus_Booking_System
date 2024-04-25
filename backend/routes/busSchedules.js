import express from "express";
import {
  addSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
  totalSchedules,
} from "../admin/schedule.js";

const router = express.Router();

router.post("/add", addSchedule);
router.get("/getschedule", getSchedule);
router.get("/totalSchedules", totalSchedules);
router.put("/edit/:id", updateSchedule);
// Changed to PUT and added path parameter for id
router.delete("/delete1/:id", deleteSchedule); // Changed to DELETE and added path parameter for id


export default router;
