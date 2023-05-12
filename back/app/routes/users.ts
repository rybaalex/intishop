const Router = require("express").Router;
const router = Router();
const userController = require("../controllers/user.controller");
const rolesMiddleware = require("../../middlewares/roles.middleware");

router.get("/refresh",
  userController.refresh_token);

router.get("/activate/:link",
  userController.activate);

router.post("/signup",
  userController.signUp);

router.post("/signin",
  userController.signIn);

router.get("/get_me",
  rolesMiddleware(["ADMIN", "USER"]),
  userController.getMe);

router.get("/users/forgot/:email",
  userController.forgot);

router.put("/users/reset",
  userController.reset);

module.exports = router;


