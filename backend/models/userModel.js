const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add username value"],
      index: {
          unique: true
      }
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      index: {
        unique: true,
      },
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    aboutMe: { type: String },
    websiteLink: { type: String },
    twitterLink: { type: String },
    githubLink: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
