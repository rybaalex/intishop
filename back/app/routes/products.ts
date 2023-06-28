const Router = require("express").Router;
const router = Router();

const ProductController = require("../controllers/product.controller");

router.get("/products",
  ProductController.getProducts);

module.exports = router;

