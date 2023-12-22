// your_server_file.mjs
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import { hashSync } from "bcrypt";

const port = process.env.PORT || 4000;
connectDB();

const salt1 = bcrypt.genSaltSync(10);

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);


app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const UserDoc = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, salt1),
  });

  res.json(UserDoc);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
