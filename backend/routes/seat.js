import express from "express";
import {
    seat,
} from "../controllers/seat.js";
const router = express.Router();
router.post("/seat", seat);
export default router;
