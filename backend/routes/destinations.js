import express from "express";
import {
    addDes,
    getDes
} from "../admin/destinations.js";


const router = express.Router();
router.post("/addDes", addDes);
router.get("/getDes", getDes);
export default router;
