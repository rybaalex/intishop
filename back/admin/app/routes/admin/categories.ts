const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../../../middlewares/roles.middleware");
const categoryController = require("../../controllers/category.controller");


router.get("/categories",
  rolesMiddleware(["ADMIN"]),
  categoryController.getCategories);

router.get("/categories/:id",
  rolesMiddleware(["ADMIN"]),
  categoryController.getCategoryOne);

router.put("/categories/published",
  rolesMiddleware(["ADMIN"]),
  categoryController.published);

router.post("/categories",
  rolesMiddleware(["ADMIN"]),
  categoryController.postCategory);

router.delete("/categories/:id",
  rolesMiddleware(["ADMIN"]),
  categoryController.deleteCategoryOne);

router.delete("/categories",
  rolesMiddleware(["ADMIN"]),
  categoryController.deleteCategoryMany);

router.put("/categories",
  rolesMiddleware(["ADMIN"]),
  categoryController.putCategory);

module.exports = router;

