const Router = require("express").Router;
const router = Router();

const rolesController = require("../controllers/role.controller");

router.get("/roles",
  rolesController.getRoles);
module.exports = router;
