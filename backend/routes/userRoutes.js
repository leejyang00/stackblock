const express = require("express");
const router = express.Router();
const {
  registerUser,
  verifyUser,
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
router.get("/verify/:userId/:token", verifyUser) // for verification link

module.exports = router;
