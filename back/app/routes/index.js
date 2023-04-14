const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const staticPageController = require("../controllers/staticpage.controller");
const brandController =require("../controllers/brand.controller")
const router = new Router();
const authMiddleware = require("../middlewares/auth.middleware");


router.post("/signin", userController.signIn);
router.post("/logout", userController.logout);

router.post("/getMe",authMiddleware,  userController.getMe);

router.post("/signup",
  userController.signUp);

router.get("/active/:link", userController.activate);
router.get("/refresh", userController.refresh_token);
router.get("/staticpage", staticPageController.getStaticPage);
router.get("/brands", brandController.getBrands);

module.exports = router;
