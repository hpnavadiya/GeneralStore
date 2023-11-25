const express = require("express");
const {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} = require("./../controllers/categoryController.js");
const { adminOnly } = require("../middleware/authMiddleware.js");

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  adminOnly,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  adminOnly,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  adminOnly,
  deleteCategoryCOntroller
);

module.exports = router;