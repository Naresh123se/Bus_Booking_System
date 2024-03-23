import express from "express";
import {
    buses,
    schedu
} from "../controllers/ram.js";
const router = express.Router();
router.get("/bus11", buses);
router.delete("/busdel:", schedu);
export default router;
