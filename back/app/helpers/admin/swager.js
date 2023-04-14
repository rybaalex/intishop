const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
/*const YAML = require('yamljs');
const path = require('path');
const swagger_path =  path.resolve(__dirname,'./swagger.yaml');*/
/*
const swaggerDocument = YAML.load(swagger_path);
*/
const options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: "./swagger.json",
        name: "Site"
      },
      {
        url: "./admin/swagger.json",
        name: "Admin"
      }
    ]
  }
};
router.use('/', swaggerUi.serve, swaggerUi.setup(null, options));

module.exports = router;