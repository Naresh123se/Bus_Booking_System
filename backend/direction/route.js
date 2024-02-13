// // Import required packages
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
// import direction from './routes/direction.js';
dotenv.config();


// // Create Express app
// const app = express();
const dire = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// Route to load Google Maps script
dire.get('/load-google-maps-script', async (req, res) => {
    try {
        // Fetch Google Maps script
        const response = await axios.get(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`);
        
        // Serve the script to the frontend
        res.send(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error loading Google Maps script:', error);
        res.status(500).json({ error: 'Failed to load Google Maps script' });
    }
});

// // Route to check if API is running
dire.get('/', (req, res) => {
    res.send('API is running1....');
});



// export {dire};





export { dire };