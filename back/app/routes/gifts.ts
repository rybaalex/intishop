const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../middlewares/roles.middleware");
const tagController = require("../../controllers/tag.controller");

router.get("/gifts",
  tagController.getTags);

module.exports = router;

