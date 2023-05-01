const Router = require("express").Router;
const router = Router();
const rolesMiddleware = require("../../../../middlewares/roles.middleware");
const userController = require("../../controllers/user.controller");

router.put("/user_is_activated",
  rolesMiddleware(["ADMIN"]),
  userController.isActivated);

router.get("/refresh",
  userController.refresh_token);

router.get("/users",
  rolesMiddleware(["ADMIN"]),
  userController.getUsers);

router.post("/getMe",
  userController.getMe);

router.post("/signin",
  userController.signIn);

router.delete("/users/:id",
  rolesMiddleware(["ADMIN"]),
  userController.deleteUserOne);

router.delete("/users",
  rolesMiddleware(["ADMIN"]),
  userController.deleteUserMany);


module.exports = router;

