const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  getUser,
  getLoginStatus,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOutUser);
router.get("/getuser", protect, getUser);
router.get("/getloginstatus", getLoginStatus);
router.patch("/updateuser", protect, updateUser);

module.exports = router;
