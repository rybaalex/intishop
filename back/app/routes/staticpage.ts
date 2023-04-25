const Router = require("express").Router;
const router = Router();

const staticPageController = require("../controllers/staticpage.controller");

router.get("/staticpages",
  staticPageController.getStaticPages);

module.exports = router;

