import express from "express";
import {
    Buses,
    busget,
    updateBus,
    deleteBus,
} from "../admin/bus.js";
const router = express.Router();
router.post("/addbus", Buses);
router.get("/getbus", busget);
router.put("/editbus/:id", updateBus);
router.delete("/delete/:id", deleteBus);
export default router;
