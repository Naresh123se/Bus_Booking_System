import "./passwort.js";
import express from "express";
const app = express();
import cors from "cors";
import google from './routes/google.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from "passport";

app.use(cookieParser("Naresh"));

app.use(
  session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:4000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", google);

export {app};