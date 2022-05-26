const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/sendEmail");

const Answer = require("../models/answerModel");
const User = require("../models/userModel");
const Question = require("../models/questionModel");
const { ConnectContactLens } = require("aws-sdk");

// @desc    submit an answer to a question, in questionProfile
// @route   POST /api/answers
// @access  Private
const submitAnswer = asyncHandler(async (req, res) => {
  const { user, userId, questionId, answerBody, questionOwnerId } = req.body;

  const questionOwner = await User.findById(questionOwnerId);
  const { email: questionOwnerEmail } = questionOwner;

  const question = await Question.findById(questionId);

  const answer = await Answer.create({
    user,
    userId,
    questionId,
    answerBody,
  });

  if (answer) {
    // send push notification email to owner of the question

    await sendEmail(
      questionOwnerEmail,
      "New Answer - Stackblock",
      `You have a new answer for your question: ${question.title}. Check the link below. <p style='font-weight:bold;'> ${process.env.BASE_URL}#/question/${questionId} </p>`
    );

    // questionOwner.email

    res.status(200).json(answer);
  } else {
    throw new Error("Unable to submit an answer");
  }
});

// @desc    get answers in relation to that question
// @route   GET /api/answers/:questionId
// @access  Public
const getAnswers = asyncHandler(async (req, res) => {
  const answers = await Answer.find({ questionId: req.params.questionId });

  res.status(200).json(answers);
});

module.exports = {
  submitAnswer,
  getAnswers,
};
