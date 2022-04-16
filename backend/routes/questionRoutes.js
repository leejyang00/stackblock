const express = require("express");
const router = express.Router();
const { uploadQuestion, getQuestions } = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getQuestions).post(protect, uploadQuestion)

module.exports = router;
