const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/sendEmail");


const Answer = require("../models/answerModel");
const User = require("../models/userModel");


// @desc    submit an answer to a question, in questionProfile
// @route   POST /api/answers
// @access  Private
const submitAnswer = asyncHandler(async (req, res) => {
  const { user, userId,  questionId, answerBody } = req.body;

  const answer = await Answer.create({
    user,
    userId, 
    questionId,
    answerBody,
  });

  // const questionOwner = await User.findById(questionOwnerId)
  // console.log(questionOwner, "<< questionOwner")
  if (answer) {

    // send push notification email to owner of the question

    // await sendEmail(
    //   questionOwner.email,
    //   ""
    // )

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

  const answers = await Answer.find({questionId: req.params.questionId});

  res.status(200).json(answers)
});

module.exports = {
  submitAnswer,
  getAnswers,
};
