import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import {sendVerificationEmail} from '../email.js';
import express from "express";
const app = express();

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

const userExists = await User.findOne({ email });
 
  

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }


  const user = await User.create({
    name,
    email,
    password,
    is_verify:0

  });

  if (user) {
    // Send verification email
    await sendVerificationEmail(email, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});



// @route   Get /api/users/verify
const verify = asyncHandler(async (req, res) => {
  const userId = req.query.id;
  const updateInfo = await User.updateOne(
    { _id: userId, is_verify: 0 }, // Ensure the user is not already verified
    { $set: { is_verify: 1 } }
  );
  if (updateInfo.nModified === 0) {
    return res.status(400).json({ success: false, message: "Invalid verification link" });
  }
  res.json({ success: true, message: "Email successfully verified" });
})




// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  verify,

};
 