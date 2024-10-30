const express = require("express");
const userController = require("../Controller/userController");
const { body } = require("express-validator");
const User = require("../models/user");
const handleErrorMessage = require("../middleware/handleErrorMessage");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/api/user/register",
  [
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("email").custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
    body("password").notEmpty(),
  ],
  handleErrorMessage,
  userController.register
);
router.post("/api/user/login", userController.login);

router.post("/api/user/logout", userController.logout);

router.get("/api/user/me", authMiddleware, userController.me);

module.exports = router;
