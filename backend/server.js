import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import booking from './routes/booking.js';
import bus from './routes/bus.js';
import busSchedules from './routes/busSchedules.js';
import passenger from './routes/passenger.js';
import seat from './routes/seat.js';
import addDes from './routes/destinations.js';
import khalti from './routes/khalti.js';
import {app} from "./google.js";
import './email.js';
import { v2 as cloudinary } from 'cloudinary';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';


const port = process.env.PORT || 5000;
const server =  createServer(app);

const io = new Server(server,{
  cors:{
    origin:"http://localhost:4000",
    methods:["GET", "POST"],
    credentials:true,
  },
}
  );
connectDB();
app.use(express.json( {limit: '50mb'} ));

app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());






app.use('/api/users', userRoutes);
app.use('/api/Booking',booking);
app.use('/api',bus);
app.use('/api',busSchedules);
app.use('/api',khalti);
app.use('/api',passenger);
app.use('/api',seat);
app.use('/api',addDes);

 cloudinary.config({ 
  cloud_name: 'busbookingsystem', 
  api_key: '318493543119992', 
  api_secret: 'OHU3SnTLUHTCzbRxQvxyvKwTCZY',
  secure: true 
});

// async function checkConnection() {
//   try {
//     // Upload a dummy image (you can replace 'dummy_image' with a path to an actual image)
//     const result = await cloudinary.uploader.upload('frontend/public/80x80.png', { resource_type: "image" });
//     console.log('Connected to Cloudinary:', result.url);
//   } catch (error) {
//     console.error('Error connecting to Cloudinary:', error);
//   }
// }

// // Call the function to check the connection
// checkConnection();

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

io.on('connection',(socket) =>{
  console.log("user connections");
  console.log("Id", socket.id);

});

server.listen(port, () => console.log(`Server started on port ${port}`));
