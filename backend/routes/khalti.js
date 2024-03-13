import express from "express";
import {
    khalti,
} from "../controllers/khalti.js";

const router = express.Router();

router.post("/payment", khalti);



export default router;
