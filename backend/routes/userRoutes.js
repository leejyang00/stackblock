const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateMe
} = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerUser).put(protect, updateMe);
router.post("/login", loginUser);
router.get("/me", protect, getMe); // middleware of protect

module.exports = router;
