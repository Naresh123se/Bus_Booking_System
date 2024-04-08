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
import stripe from './routes/stripe.js'


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
app.use('/api',stripe);


 cloudinary.config({ 
  cloud_name: 'busbookingsystem', 
  api_key: '318493543119992', 
  api_secret: 'OHU3SnTLUHTCzbRxQvxyvKwTCZY',
  secure: true 
});



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

// let onlineUsers = [];

// Function to add a new user to the online users array
// const addNewUser = (username, socketId) => {
//   const existingUserIndex = onlineUsers.findIndex(user => user.username === username);
//   if (existingUserIndex === -1) {
//     onlineUsers.push({ username, socketId });
//   } else {
//     onlineUsers[existingUserIndex].socketId = socketId;
//   }
// };

// // Function to remove a user from the online users array
// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
// };

// Function to get user by username
// const getUser = (username) => {
//   return onlineUsers.find(user => user.username === username);
// };

// // Admin emits a notification to all users
// io.on('connection', (socket) => {
//   console.log(`User connection ${socket.id}`);

//   // Add new user when they connect
//   socket.on('addUser', (username) => {
//     addNewUser(username, socket.id);
//   });

//   // Remove user when they disconnect
//   socket.on('disconnect', () => {
//     removeUser(socket.id);
//   });

//   // Send notification to all users except the sender
//   socket.on('sendNotification', (notification) => {
//     console.log(`Admin sent a notification: ${notification}`);
//     io.emit('notification', notification);
//   });
// });


// // Middleware to handle CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4173'); // Adjust this to your React app's URL
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

server.listen(port, () => console.log(`Server started on port ${port}`));
