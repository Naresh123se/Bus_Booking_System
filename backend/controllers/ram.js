


import asyncHandler from "express-async-handler";
import { Bus , Schedule } from "../models/naresh.js";


// Route to get all buses
const buses = asyncHandler(async (req, res) => {
// bus.get('/buses', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to create a schedule
const schedu = asyncHandler(async (req, res) => {
// bus.post('/schedules', async (req, res) => {
    try {
        const { busId, startTime, endTime } = req.body;

        // Ensure the bus exists
        const bus = await Bus.findById(busId);
        if (!bus) {
            return res.status(400).json({ error: 'Selected bus does not exist' });
        }

        // Create the schedule
        const schedule = new Schedule({
            bus: busId,
            startTime,
            endTime
        });

        await schedule.save();
        res.status(201).json(schedule);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { buses, schedu};