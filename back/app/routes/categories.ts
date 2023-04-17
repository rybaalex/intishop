const Router = require("express").Router;
const router = Router();

const CategoryController = require("../controllers/category.controller");

router.get("/categories",
  CategoryController.getCategories);

module.exports = router;

