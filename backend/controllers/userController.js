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

// @desc    Forgot user's password
// @route   POST /api/user/forgot-password
const forgotPasswordUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Email does not exists");
  }

  // verify reset password token
  const token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
  }).save();

  const changePasswordUrl = `${process.env.BASE_URL}#/user/change-password/${token.userId}/${token.token}`;

  try {
    const result = await sendEmail(
      user.email,
      "Reset your password - Stackblock",
      changePasswordUrl
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400);
    throw new Error("Forgot password link failed to send");
  }
});

// @desc    Change user's password
// @route   POST /api/user/change-password
const changePasswordUser = asyncHandler(async (req, res) => {
  const { userId, token, currentPassword, newPassword } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error("Invalid link");
  }

  const tokenReturned = await Token.findOne({
    userId: userId,
    token: token,
  });

  if (!tokenReturned) {
    res.status(400);
    throw new Error("Invalid link");
  }

  const passwordResult = await bcrypt.compare(currentPassword, user.password);
  if (!passwordResult) {
    res.status(400);
    throw new Error("Invalid credentials logging in");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  try {
    const result = await User.updateOne(
      { _id: user._id },
      { password: hashedPassword }
    );
    // console.log(result, '<< RESULT')
    await tokenReturned.remove();
    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(400);
    throw new Error("Failure to change password");
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
    favoriteQuestions: user.favoriteQuestions,
    token: generateToken(user._id),
  });
});

// @desc     get user's personal data
// @route    GET /api/users/me
// @access   Private
const getMe = asyncHandler(async (req, res) => {
  // console.log(req.body, '<-req.body')
  const { userId, token } = req.body;

  const user = await User.findById(userId);
  // console.log(user, "<-user")

  if (!user) {
    res.status(400);
    throw new Error("Change password link does not exists");
  }

  const tokenReturned = await Token.findOne({
    userId: userId,
    token: token,
  });

  // console.log(tokenReturned, 'tokenReturned')

  if (!tokenReturned) {
    res.status(400);
    throw new Error("Change password link does not exists");
  }

  res.status(200).json(user);
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

// @desc    Update array of favorite questions
// @route   PUT /api/users/update-favorite-questions
// @access  Public
const updateFavoriteQuestion = asyncHandler(async (req, res) => {
  const { userId, questionId } = req.body;

  const { favoriteQuestions } = await User.findById(userId);

  var result = {};

  if (favoriteQuestions.includes(questionId)) {
    result = await User.findByIdAndUpdate(
      userId,
      { $pull: { favoriteQuestions: questionId } },
      { new: true }
    );
  } else {
    result = await User.findByIdAndUpdate(
      userId,
      { $push: { favoriteQuestions: questionId } },
      { new: true }
    );
  }

  res.status(200).json(result);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  forgotPasswordUser,
  changePasswordUser,
  verifyUser,
  loginUser,
  getMe,
  getUser,
  updateMe,
  updateFavoriteQuestion,
};
