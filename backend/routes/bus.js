import express from "express";
import {
    bus,
    busget,
} from "../controllers/bus.js";
const router = express.Router();
router.post("/addbus", bus);
router.get("/getbus", busget);
export default router;
