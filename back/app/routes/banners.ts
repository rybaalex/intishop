const Router = require("express").Router;
const router = Router();

const BannerController = require("../controllers/banner.controller");

router.get("/banners",
  BannerController.getBanners);

module.exports = router;

