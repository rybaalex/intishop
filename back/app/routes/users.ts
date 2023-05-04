const Router = require("express").Router;
const router = Router();
const rolesMiddleware = require("../../middlewares/roles.middleware");
const userController = require("../controllers/user.controller");

router.put("/user_is_activated",
  rolesMiddleware(["ADMIN"]),
  userController.isActivated);

router.get("/refresh",
  userController.refresh_token);

router.get("/users",
  rolesMiddleware(["ADMIN"]),
  userController.getUsers);

router.get("/activate/:link",
  userController.activate);

router.get("/users/:id",
  userController.getUsersOne);

router.post("/signup",
  userController.signUp);

router.post("/signin",
  userController.signIn);

router.get("/users/forgot/:email",
  userController.forgot);

router.put("/users/reset",
  userController.reset);

module.exports = router;

