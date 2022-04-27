const asyncHandler = require("express-async-handler");

const Question = require("../models/questionModel");

// @desc    Get all questions submitted by user
// @route   GET /api/questions
// @access  Public
const getUserQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({ user: req.user.id });

  res.status(200).json(questions);

});

// @desc    Get ALL questions, should be the first 10, pagination next 10
// @route   GET /api/questions/all
// @access  Public
const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({}).sort({createdAt: -1});

  res.status(200).json(questions)
})

// @desc    Get specific question with questionID as URL params
// @route   GET /api/questions/:questionID
// @access  Private
const getQuestion = asyncHandler(async (req, res) => {

  const question = await Question.findById(req.params.questionID);

  res.status(200).json(question);
});

// @desc    Submit a new question
// @route   POST /api/questions
// @access  Private
const submitQuestion = asyncHandler(async (req, res) => {
  const { title, body, tags } = req.body;

  if (!body || !title) {
    res.status(400);
    throw new Error("Please add a title or body");
  }

  const questionAsked = await Question.create({
    user: req.user.id,
    username: req.user.username,
    title: title,
    body: body,
    tags: tags,
  });

  if (questionAsked) {
    res.status(201).json(questionAsked);
  } else {
    res.status(400);
    throw new Error("Unable to upload question");
  }
});

// @desc    Delete a question
// @route   DELETE /api/questions
// @access  Private
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }

  // Check for user exist
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (questions.user.id !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await question.remove();

  res.status(200).json({
    questionID: req.params.id,
    question: question,
  });
});

module.exports = {
  getUserQuestions,
  getAllQuestions, 
  getQuestion,
  submitQuestion,
  deleteQuestion,
};
