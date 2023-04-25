const Router = require("express").Router;
const roles = require("./roles.ts");
const staticPage = require("./staticpage.ts");
const categories = require("./categories.ts");
const banners = require("./banners.ts");
//const users = require("./users.ts");

let rootRouter = Router();
rootRouter.use("/", roles);
rootRouter.use("/", staticPage);
rootRouter.use("/", categories);
rootRouter.use("/", banners);
//rootRouter.use("/", users);

module.exports = rootRouter;
