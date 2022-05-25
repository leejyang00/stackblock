const asyncHandler = require("express-async-handler");
const { UserRefreshClient } = require("google-auth-library");

const LikeQuestion = require("../models/likeQuestionModel");
const Question = require("../models/questionModel");
const User = require("../models/userModel");

// @desc    Get all likes for a question
// @route   GET /api/likes/
// @access  Public
const getLikes = asyncHandler(async (req, res) => {

  const { questionId } = req.params;

  const question = await Question.findById(questionId);
  if (!question) {
    res.status(400);
    throw new Error("Question or User does not exist");
  }


  const result = await LikeQuestion.findOne({ questionId: questionId });
  // console.log(result, "<< result");

  if (!result) {
    const newLike = await LikeQuestion.create({ questionId: questionId });
    res.status(200).json(newLike);
  } else {
    res.status(200).json(result);
  }
});

// @desc    Update likes for a question
// @route   PUT /api/likes/
// @access  Public
const updateLikes = asyncHandler(async (req, res) => {
  const { questionId, userId } = req.body;

  const question = await Question.findById(questionId);
  const user = await User.findById(userId);

  if (!question || !user) {
    res.status(400);
    throw new Error("Question or User does not exist");
  }

  const filter = { questionId: questionId };
  const updatePush = { $push: { likes: userId } };
  const updatePull = { $pull: { likes: userId } };

  const result = await LikeQuestion.findOne(filter);

  if (!result) {
    const update = await LikeQuestion.findOneAndUpdate(filter, updatePush, {
      new: true,
      upsert: true,
    });
    res.status(200).json(update);
  } else {
    const { likes } = result;
    var update = {};

    if (likes.includes(userId)) {
      update = await LikeQuestion.findOneAndUpdate(filter, updatePull, {
        new: true,
      });
    } else {
      update = await LikeQuestion.findOneAndUpdate(filter, updatePush, {
        new: true,
      });
    }
    res.status(200).json(update);
  }

  // res.status(200).json(result);
});

module.exports = {
  getLikes,
  updateLikes,
};
