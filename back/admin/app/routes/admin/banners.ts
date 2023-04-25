const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../../../middlewares/roles.middleware");
const bannerController = require("../../controllers/banner.controller");


router.get("/banners",
  rolesMiddleware(["ADMIN"]),
  bannerController.getBanners);

router.get("/banners/:id",
  rolesMiddleware(["ADMIN"]),
  bannerController.getBannerOne);

router.put("/banners/published",
  rolesMiddleware(["ADMIN"]),
  bannerController.published);

router.post("/banners",
  rolesMiddleware(["ADMIN"]),
  bannerController.postBanner);

router.delete("/banners/:id",
  rolesMiddleware(["ADMIN"]),
  bannerController.deleteBannerOne);

router.delete("/banners",
  rolesMiddleware(["ADMIN"]),
  bannerController.deleteBannerMany);

router.put("/banners",
  rolesMiddleware(["ADMIN"]),
  bannerController.putBanner);

module.exports = router;

