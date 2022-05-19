const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/sendEmail");

// @desc     Register new user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exist
  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    res.status(400);
    throw new Error("Username already exist");
  }

  if (emailExists) {
    res.status(400);
    throw new Error("Email address already exist");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // verify email token
  const token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
  }).save();

  const verifyUrl = `${process.env.BASE_URL}#/user/verify/${token.userId}/${token.token}`;

  try {
    const result = await sendEmail(
      user.email,
      "Email Verification - Stackblock",
      verifyUrl
    );
    // console.log(result, 'email sent ...')
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
    return result;
  } catch (error) {
    res.status(400);
    throw new Error("Invalid registering user");
  }
});

// @desc    Verify new user
// @route   GET /api/user/verify/:userId/:token
const verifyUser = asyncHandler(async (req, res) => {
  const { userId, token } = req.params;

  try {
    const userReturned = await User.findOne({
      _id: userId,
    });
    if (!userReturned) return res.status(400).send({ message: "Invalid Link" });

    const tokenReturned = await Token.findOne({
      userId: userId,
      token: token,
    });

    if (!tokenReturned)
      return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: userReturned._id }, { verified: true });
    await tokenReturned.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Internal server error");
  }
});

// @desc     Login user
// @route    POST /api/users/login
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials logging in");
  }
  const passwordResult = await bcrypt.compare(password, user.password);

  if (!passwordResult) {
    res.status(400);
    throw new Error("Invalid credentials logging in");
  }

  if (user.verified === false) {
    res.status(400);
    throw new Error("Email not verified");
  }

  res.status(200).json({
    _id: user.id,
    username: user.username,
    email: user.email,
    aboutMe: user.aboutMe,
    website: user.website,
    twitter: user.twitter,
    github: user.github,
    createdAt: user.createdAt,
    token: generateToken(user._id),
  });
});

// @desc     get user's personal data
// @route    GET /api/users/me
// @access   Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    get other user's data, for question and answer profile
// @route   GET /api/users/:userId
// @access  Public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select("-password");
  res.status(200).json(user);
});

// @desc     Update user profile details from 'EDIT PROFILE'
// @route    PUT /api/users
// @access   Private
const updateMe = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  }).select("-password");

  res.status(200).json(updatedUser);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  verifyUser,
  loginUser,
  getMe,
  getUser,
  updateMe,
};
