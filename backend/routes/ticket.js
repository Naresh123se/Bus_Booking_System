import express from "express";
import {
    createTicket,
    getAllTickets

} from "../controllers/ticket.js";
const router = express.Router();
router.post("/create",createTicket);
router.get("/getTicket",getAllTickets);

export default router;
        