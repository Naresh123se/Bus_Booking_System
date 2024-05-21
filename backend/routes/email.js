import express from "express";
import {
    CancelTicketMail,
} from "../controllers/CancelTicketMail.js";

// import {
//     khalti_com,
// } from "../controllers/PaymentCon.js";



const router = express.Router();

router.post("/cancelMail", CancelTicketMail);
// router.post("/khalti_com", khalti_com);





export default router;
