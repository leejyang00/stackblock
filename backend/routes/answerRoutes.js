const express = require("express");
const router = express.Router();

const { submitAnswer, getAnswers } = require("../controllers/answerController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, submitAnswer);
router.route("/:questionId").get(getAnswers);

module.exports = router;
