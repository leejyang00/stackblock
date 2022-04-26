const express = require("express");
const router = express.Router();
const {
  submitQuestion,
  getUserQuestions,
  getQuestion,
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUserQuestions).post(protect, submitQuestion);
router.route("/:questionID").get(getQuestion);

module.exports = router;
