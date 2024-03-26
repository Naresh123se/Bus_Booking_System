import express from "express";
import {
    seat,
    seatget,
} from "../controllers/seat.js";
const router = express.Router();
router.post("/seat", seat);
router.get("/getseat", seatget);
export default router;
