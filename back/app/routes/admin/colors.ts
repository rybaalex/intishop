const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../middlewares/roles.middleware");
const colorController = require("../../controllers/color.controller");


router.get("/colors",
  rolesMiddleware(["ADMIN"]),
  colorController.getColors);

router.get("/colors/:id",
  rolesMiddleware(["ADMIN"]),
  colorController.getColorOne);

router.put("/colors/published",
  rolesMiddleware(["ADMIN"]),
  colorController.published);

router.post("/colors",
  rolesMiddleware(["ADMIN"]),
  colorController.postColor);

router.delete("/colors/:id",
  rolesMiddleware(["ADMIN"]),
  colorController.deleteColorOne);
router.delete("/colors",
  rolesMiddleware(["ADMIN"]),
  colorController.deleteColorMany);
router.put("/colors",
  rolesMiddleware(["ADMIN"]),
  colorController.putColor);

module.exports = router;

