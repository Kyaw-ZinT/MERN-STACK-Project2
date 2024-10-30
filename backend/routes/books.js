const express = require("express");
const { body } = require("express-validator");
const bookController = require("../Controller/bookController");
const router = express.Router();
const handleErrorMessage = require("../middleware/handleErrorMessage");

router.get("", bookController.index);

router.post(
  "",
  [body("title").notEmpty(), body("description").notEmpty(), body("categories").notEmpty().isArray({ min: 3 })],
  handleErrorMessage,
  bookController.store
);

router.get("/:id", bookController.show);

router.delete("/:id", bookController.destroy);

router.patch("/:id", bookController.update);

module.exports = router;
