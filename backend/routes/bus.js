import express from "express";
import {
    Buses,
    busget,
    updateBus,
} from "../admin/bus.js";
const router = express.Router();
router.post("/addbus", Buses);
router.get("/getbus", busget);
router.put("/editbus/:id", updateBus);
export default router;
