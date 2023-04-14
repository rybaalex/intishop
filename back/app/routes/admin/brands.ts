const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../middlewares/roles.middleware");
const brandController = require("../../controllers/brand.controller");


router.get("/brands",
  rolesMiddleware(["ADMIN"]),
  brandController.getBrands);

router.get("/brands/:id",
  rolesMiddleware(["ADMIN"]),
  brandController.getBrandOne);

router.put("/brands/published",
  rolesMiddleware(["ADMIN"]),
  brandController.published);

router.post("/brands",
  rolesMiddleware(["ADMIN"]),
  brandController.postBrand);

router.delete("/brands/:id",
  rolesMiddleware(["ADMIN"]),
  brandController.deleteBrandOne);
router.delete("/brands",
  rolesMiddleware(["ADMIN"]),
  brandController.deleteBrandMany);
router.put("/brands",
  rolesMiddleware(["ADMIN"]),
  brandController.putBrand);

module.exports = router;

