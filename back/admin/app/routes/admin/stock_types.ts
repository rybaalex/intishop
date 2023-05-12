const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../../../middlewares/roles.middleware");
const stockTypeController = require("../../controllers/stock_type.controller");


router.get("/stock_types",
    rolesMiddleware(["ADMIN"]),
  stockTypeController.getStockTypes);

router.get("/stock_types/:id",
    rolesMiddleware(["ADMIN"]),
  stockTypeController.getStockTypeOne);

router.post("/stock_types",
    rolesMiddleware(["ADMIN"]),
  stockTypeController.postStockType);

router.delete("/stock_types/:id",
    rolesMiddleware(["ADMIN"]),
  stockTypeController.deleteStockTypeOne);
router.delete("/stock_types",
    rolesMiddleware(["ADMIN"]),
  stockTypeController.deleteStockTypeMany);
router.put("/stock_types",
    rolesMiddleware(["ADMIN"]),
  stockTypeController.putStockType);

module.exports = router;

