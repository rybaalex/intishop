const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../../../middlewares/roles.middleware");
const productController = require("../../controllers/product.controller");

router.get("/products",
  rolesMiddleware(["ADMIN"]),
  productController.getProducts);

router.put("/products/published",
  rolesMiddleware(["ADMIN"]),
  productController.published);

router.get("/products/:id",
  rolesMiddleware(["ADMIN"]),
  productController.getProductOne);

router.post("/products",
  rolesMiddleware(["ADMIN"]),
  productController.postProduct);

router.put("/products",
  rolesMiddleware(["ADMIN"]),
  productController.putProduct);

router.delete("/products/:id",
  rolesMiddleware(["ADMIN"]),
  productController.deleteProductOne);

router.delete("/products",
  rolesMiddleware(["ADMIN"]),
  productController.deleteProductMany);

module.exports = router;

