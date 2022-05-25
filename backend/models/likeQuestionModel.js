const mongoose = require("mongoose");

const likeQuestionSchema = mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Question",
  },
  likes: [String], // string of userId
});

module.exports = mongoose.model("LikeQuestion", likeQuestionSchema);
