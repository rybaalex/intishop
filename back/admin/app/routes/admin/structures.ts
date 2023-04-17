const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../../../middlewares/roles.middleware");
const structureController = require("../../controllers/structure.controller");


router.get("/structures",
    rolesMiddleware(["ADMIN"]),
    structureController.getStructures);

router.get("/structures/:id",
    rolesMiddleware(["ADMIN"]),
    structureController.getStructureOne);

router.put("/structures/published",
    rolesMiddleware(["ADMIN"]),
    structureController.published);

router.post("/structures",
    rolesMiddleware(["ADMIN"]),
    structureController.postStructure);

router.delete("/structures/:id",
    rolesMiddleware(["ADMIN"]),
    structureController.deleteStructureOne);
router.delete("/structures",
    rolesMiddleware(["ADMIN"]),
    structureController.deleteStructureMany);
router.put("/structures",
    rolesMiddleware(["ADMIN"]),
    structureController.putStructure);

module.exports = router;

