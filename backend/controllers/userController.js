import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { sendVerificationEmail } from "../email.js";
import express from "express";

import generateVerificationToken from "../utils/generateVerificationToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email or password is null or empty
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (user.isVerified === 0) {
    // Assuming 0 means email is not verified
    res.status(401);
    res.json({
      message: "Please verify your email address.",
    });
  }

  if (user.isVerified === 1) {
    // Assuming 1 means email is verified
    if (await user.matchPassword(password)) {
      generateToken(res, user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(401);
    throw new Error("Please verify your email address.");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(401);
    throw new Error("User already exists");
  }
  // Check if email or password is null or empty
  if (!email || !password || !name) {
    res.status(400);
    throw new Error("Email, name, and password are required");
  }
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email provided matches the valid email format
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Please provide a valid email address");
  }
  // Regular expression for password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

  // Check if the password meets the criteria
  if (!passwordRegex.test(password)) {
    res.status(400);
    throw new Error(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    );
  }

  const otherToken = generateVerificationToken();
  // Send verification email
  const emailSent = await sendVerificationEmail(email, otherToken); // Use userExists?._id to avoid errors if userExists is null

  // If email is sent successfully, create new user
  if (emailSent) {
    try {
      const user = await User.create({
        name,
        email,
        password,
        verificationToken: otherToken,
        isVerified: false,
      });

      // Send success message
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        successMessage: "Registration successful. Please verify your email.",
      });
    } catch (error) {
      // Handle error if creating user fails

      console.error("Error registering user:", error);
      res.status(500).json({ message: "An error occurred while registering user" });
    }
  } else {
    res.status(500);
    throw new Error("An error occurred while sending verification email");

    // Handle case where email sending fails
  }
});

// @route   Get /api/users/verify
const verify = asyncHandler(async (req, res) => {
  const otherToken = req.query.otherToken;

  // Validate otherToken
  if (!otherToken || typeof otherToken !== 'string' || otherToken.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid token" });
  }

  try {
    const user = await User.findOne({ verificationToken: otherToken });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found with this verification token" });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(200).json({ success: true, message: "User is already verified", verificationStatus: "alreadyVerified" });
    }

    // Mark user as verified 
    user.isVerified = true;
    await user.save();

    res.status(200).json({ success: true, message: "Verification successful", verificationStatus: "success" });

  } catch (err) {
    console.error("Error occurred during verification:", err);
    res.status(500).json({ success: false, message: "An error occurred during verification" });
  }
});


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
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
    throw new Error("User not found");
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
    throw new Error("User not found");
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});


export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  verify,
  getUser,
};