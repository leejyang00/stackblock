const express = require("express");
const router = express.Router();
const {
  registerUser,
  forgotPasswordUser,
  changePasswordUser,
  verifyUser,
  loginUser,
  getMe,
  getUser,
  updateMe,
  updateFavoriteQuestion
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).put(protect, updateMe);
router.post("/login", loginUser);
router.post("/me", protect, getMe); // middleware of protect
router.get("/:userId", getUser);
router.get("/verify/:userId/:token", verifyUser); // for verification link
router.post("/forgot-password", forgotPasswordUser);
router.post("/change-password", changePasswordUser); // for verification link
router.post("/update-favorite-questions", updateFavoriteQuestion)

module.exports = router;
