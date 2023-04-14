const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../middlewares/roles.middleware");
const labelController = require("../../controllers/label.controller");


router.get("/labels",
  rolesMiddleware(["ADMIN"]),
  labelController.getLabels);

router.get("/labels/:id",
  rolesMiddleware(["ADMIN"]),
  labelController.getLabelOne);

router.post("/labels",
  rolesMiddleware(["ADMIN"]),
  labelController.postLabel);

router.delete("/labels/:id",
  rolesMiddleware(["ADMIN"]),
  labelController.deleteLabelOne);

router.delete("/labels",
  rolesMiddleware(["ADMIN"]),
  labelController.deleteLabelMany);

router.put("/labels",
  rolesMiddleware(["ADMIN"]),
  labelController.putLabel);

module.exports = router;

