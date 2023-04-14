const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../middlewares/roles.middleware");
const sizeController = require("../../controllers/size.controller");


router.get("/sizes",
    rolesMiddleware(["ADMIN"]),
    sizeController.getSizes);

router.get("/sizes/:id",
    rolesMiddleware(["ADMIN"]),
    sizeController.getSizeOne);

router.put("/sizes/published",
    rolesMiddleware(["ADMIN"]),
    sizeController.published);

router.post("/sizes",
    rolesMiddleware(["ADMIN"]),
    sizeController.postSize);

router.delete("/sizes/:id",
    rolesMiddleware(["ADMIN"]),
    sizeController.deleteSizeOne);
router.delete("/sizes",
    rolesMiddleware(["ADMIN"]),
    sizeController.deleteSizeMany);
router.put("/sizes",
    rolesMiddleware(["ADMIN"]),
    sizeController.putSize);

module.exports = router;

