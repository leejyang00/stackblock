const express = require("express");
const router = express.Router();
const {
  submitQuestion,
  getUserQuestions,
  getQuestion,
  getAllQuestions,
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUserQuestions).post(protect, submitQuestion);
router.route("/all").get(getAllQuestions);
router.route("/:questionID").get(getQuestion);

module.exports = router;
