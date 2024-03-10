import asyncHandler from "express-async-handler";
import Schedule from "../models/busSchedules.js";


const addSchedule = asyncHandler(async (req, res) => {
    const { startTime, endTime, startLocation, endLocation, price } = req.body;


const schedule = await Schedule.create({
    startTime,
    endTime,
    startLocation,
    endLocation,
    price,
});


});
export{
    addSchedule,
};











export {
    addSchedule,
    endSchedule,
    deleteSchedule,
};


