const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add username value"],
      index: {
        unique: true,
      },
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      index: {
        unique: true,
      },
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    aboutMe: { type: String },
    website: { type: String },
    twitter: { type: String },
    github: { type: String },
    verified: { type: Boolean, default: false },
    favoriteQuestions: [String]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
