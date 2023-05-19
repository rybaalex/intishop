const Router = require("express").Router;
const roles = require("./roles.ts");
const users = require("./users.ts");
const colors = require("./colors.ts");
const tags = require("./tags.ts");
const labels = require("./labels.ts");
const sizes = require("./sizes.ts");
const structures = require("./structures.ts");
const brands = require("./brands.ts");
const categories = require("./categories.ts");
const banners = require("./banners.ts");
const stockType = require("./stock_types.ts");
const stock = require("./stock.ts");
const product = require("./products.ts");
const country = require("./countries.ts");

//users

let rootRouter = Router();
rootRouter.use("/", roles);
rootRouter.use("/", users);
rootRouter.use("/", colors);
rootRouter.use("/", sizes);
rootRouter.use("/", structures);
rootRouter.use("/", brands);
rootRouter.use("/", tags);
rootRouter.use("/", labels);
rootRouter.use("/", categories);
rootRouter.use("/", banners);
rootRouter.use("/", stockType);
rootRouter.use("/", stock);
rootRouter.use("/", product);
rootRouter.use("/", country);

module.exports = rootRouter;
