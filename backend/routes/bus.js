import express from "express";
import {
    Buses,
    busget,
    updateBus,
    deleteBus,
    totalBuses
} from "../admin/bus.js";
const router = express.Router();
router.post("/addbus", Buses);
router.get("/getbus", busget);
router.get("/totalBuses", totalBuses);
router.put("/editbus/:id", updateBus);
router.delete("/delete/:id", deleteBus);
export default router;
