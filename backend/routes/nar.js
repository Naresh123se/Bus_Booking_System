import express from "express";
import {
    na,
    nar,
    busdel
} from "../controllers/buss.js";
const router = express.Router();
router.get("/na", na);
router.post("/nar", nar);
router.delete("/busdel/:id", busdel);

export default router;
