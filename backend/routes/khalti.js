import express from "express";
import {
    khalti,
} from "../controllers/khalti.js";

import {
    khalti_com,
} from "../controllers/PaymentCon.js";



const router = express.Router();

router.post("/khalti", khalti);
router.post("/khalti_com", khalti_com);





export default router;
