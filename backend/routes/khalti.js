import express from "express";
import {
    khalti,
} from "../controllers/khalti.js";

const router = express.Router();

router.post("/khalti", khalti);



export default router;
