const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const swagger_path = path.resolve(__dirname, "./swagger.yaml");
const swagger_pathAdmin = path.resolve(__dirname, "./admin/swagger.yaml");

const swaggerDocument = YAML.load(swagger_path);
const swaggerDocumentAdmin = YAML.load(swagger_pathAdmin);
/*const options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: "openapi.json",
        name: "Site"
      },
      {
        url: "http://petstore.swagger.io/v2/swagger.json",
        name: "Admin"
      }
    ]
  }
};*/
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocumentAdmin));

/*
router.use("/admin", swaggerUi.serveFiles, swaggerUi.setup(swaggerDocumentAdmin));
*/

module.exports = router;