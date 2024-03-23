import express from "express";
import {
    buses,
    schedu,
   
} from "../controllers/ram.js";
const router = express.Router();
router.get("/bus11", buses);

export default router;
