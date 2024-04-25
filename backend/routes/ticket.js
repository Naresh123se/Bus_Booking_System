import express from "express";
import {
    createTicket,
    getAllTickets,
    totalTickets,

} from "../controllers/ticket.js";
const router = express.Router();
router.post("/create",createTicket);
router.get("/getTicket",getAllTickets);
router.get("/totalTickets",totalTickets);

export default router;
        