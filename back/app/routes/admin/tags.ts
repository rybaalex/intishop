const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../middlewares/roles.middleware");
const tagController = require("../../controllers/tag.controller");


router.get("/tags",
  rolesMiddleware(["ADMIN"]),
  tagController.getTags);

router.get("/tags/:id",
  rolesMiddleware(["ADMIN"]),
  tagController.getTagOne);

router.put("/tags/published",
  rolesMiddleware(["ADMIN"]),
  tagController.published);

router.post("/tags",
  rolesMiddleware(["ADMIN"]),
  tagController.postTag);

router.delete("/tags/:id",
  rolesMiddleware(["ADMIN"]),
  tagController.deleteTagOne);

router.delete("/tags",
  rolesMiddleware(["ADMIN"]),
  tagController.deleteTagMany);

router.put("/tags",
  rolesMiddleware(["ADMIN"]),
  tagController.putTag);

module.exports = router;

