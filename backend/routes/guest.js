import express from "express";
import {
    addguest,
} from "../controllers/guest.js";





const router = express.Router();

router.post("/guest", addguest);

export default router;
