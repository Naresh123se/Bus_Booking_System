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
import ticket from './routes/ticket.js';
import blog from './routes/blog.js';
import coupons from './routes/coupons.js';
import {app} from "./google.js";
import './email.js';
import { v2 as cloudinary } from 'cloudinary';
import stripe from './routes/stripe.js'


const port = process.env.PORT || 5000;
//DB connection
connectDB();
app.use(express.json( {limit: '50mb'} ));

app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());

//Routes
app.use('/api/users', userRoutes);
app.use('/api/Booking',booking);
app.use('/api',bus);
app.use('/api',busSchedules);
app.use('/api',khalti);

app.use('/api',passenger);
app.use('/api',seat);
app.use('/api',addDes);
app.use('/api',stripe);
app.use('/api',ticket);
app.use('/api',blog);
app.use('/api',coupons);

//Cloud Storage
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


//
app.listen(port, () => console.log(`Server started on port ${port}`));
