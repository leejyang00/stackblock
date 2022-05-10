const mongoose = require("mongoose");

const answerSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    userId: {
      type: String,
      required: true,
    }, 
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    answerBody: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Answer", answerSchema);
