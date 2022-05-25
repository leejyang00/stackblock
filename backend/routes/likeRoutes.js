const express = require("express");
const router = express.Router();

const {
  getLikes,
  updateLikes,
} = require("../controllers/likeQuestionController");

// router.put("/", updateLikes);
router.route("/").put(updateLikes);
router.route("/:questionId").get(getLikes)

module.exports = router;
