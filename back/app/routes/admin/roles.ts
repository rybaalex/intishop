const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../middlewares/roles.middleware");
const rolesController = require("../../controllers/role.controller");

router.get("/roles",
  rolesMiddleware(["ADMIN"]),
  rolesController.getRoles);

router.put("/roles",
  rolesMiddleware(["ADMIN"]),
  rolesController.putRole);

router.post("/roles",
  rolesMiddleware(["ADMIN"]),
  rolesController.postRole);

router.delete("/roles/:id",
  rolesMiddleware(["ADMIN"]),
  rolesController.deleteRoleOne);
router.delete("/roles",
  rolesMiddleware(["ADMIN"]),
  rolesController.deleteRoleMany);


router.get("/roles/:id",
  rolesMiddleware(["ADMIN"]),
  rolesController.getRoleOne);
module.exports = router;
