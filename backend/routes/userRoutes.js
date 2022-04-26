const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUser,
  updateMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).put(protect, updateMe);
router.post("/login", loginUser);
router.get("/me", protect, getMe); // middleware of protect
router.get("/:userId", getUser);

module.exports = router;
