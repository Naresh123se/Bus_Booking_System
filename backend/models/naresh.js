// models.js

import mongoose from "mongoose";

// Define the Bus schema
const busSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
});

// Define the Schedule schema
const scheduleSchema = new mongoose.Schema({
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    // Add more fields as needed
});

// Define the Bus model
const Bus11 = mongoose.model('Bus11', busSchema);

// Define the Schedule model
const Schedule11 = mongoose.model('Schedule11', scheduleSchema);

export { Bus11, Schedule11 };
