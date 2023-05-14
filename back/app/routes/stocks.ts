const Router = require("express").Router;
const router = Router();

const stockController = require("../controllers/stock.controller");

router.get("/stocks",
  stockController.getStocks);

module.exports = router;

