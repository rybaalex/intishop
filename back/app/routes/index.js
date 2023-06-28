const Router = require("express").Router;
const roles = require("./roles.ts");
const staticPage = require("./staticpage.ts");
const categories = require("./categories.ts");
const banners = require("./banners.ts");
const users = require("./users.ts");
const stocks = require("./stocks.ts");
const products = require("./products.ts");

let rootRouter = Router();
rootRouter.use("/", roles);
rootRouter.use("/", staticPage);
rootRouter.use("/", categories);
rootRouter.use("/", banners);
rootRouter.use("/", users);
rootRouter.use("/", stocks);
rootRouter.use("/", products);

module.exports = rootRouter;
