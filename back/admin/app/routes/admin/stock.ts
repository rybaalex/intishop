const Router = require("express").Router;
const router = Router();

const rolesMiddleware = require("../../../../middlewares/roles.middleware");
const stockController = require("../../controllers/stock.controller");

router.get("/stocks",
  rolesMiddleware(["ADMIN"]),
  stockController.getStocks);

router.put("/stocks/published",
  rolesMiddleware(["ADMIN"]),
  stockController.published);

router.get("/stocks/:id",
  rolesMiddleware(["ADMIN"]),
  stockController.getStockOne);

router.post("/stocks",
  rolesMiddleware(["ADMIN"]),
  stockController.postStock);

router.put("/stocks",
  rolesMiddleware(["ADMIN"]),
  stockController.putStock);

router.delete("/stocks/:id",
  rolesMiddleware(["ADMIN"]),
  stockController.deleteStockOne);

router.delete("/stocks",
  rolesMiddleware(["ADMIN"]),
  stockController.deleteStockMany);


module.exports = router;

