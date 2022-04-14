const asyncHandler = require("express-async-handler");

const Question = require("../models/questionModel");

// @desc    Get questions
// @route   GET /api/questions
// @access  Public
const getQuestions = asyncHandler( async (req, res) => {

  const questions = await Question.find()

  res.status(200).json(questions)
})

// @desc    Upload a new question
// @route   POST /api/questions
// @access  Private
const uploadQuestion = asyncHandler(async (req, res) => {
  const { question, tags } = req.body;

  if (!question) {
    res.status(400);
    throw new Error("Please add a question");
  }

  // HANDLE TAGS, SHOULD BE ACCEPTED AS ARRAY, AND ABLE TO PUSH
  // console.log(tags)

  const questionAsked = await Question.create({
    question: req.body.question,
    user: req.user.id,
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
    res.status(401)
    throw new Error('User not authorized')
  }

  await question.remove()

  res.status(200).json({
    questionID: req.params.id,
    question: question
  })

});

module.exports = {
  getQuestions,
  uploadQuestion,
  deleteQuestion
};
