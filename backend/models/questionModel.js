const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    body: {
      type: String,
      required: [true, "Please add a body"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    tags: [String],
    imageLinks: [String]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
