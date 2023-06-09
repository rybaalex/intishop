const productService = require("../services/product.service");
const responseDto = require("../../../dtos/response.dto");
const productDto = require("../../../dtos/product.dto");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const DIR = path.join(__dirname + "../../../../" + process.env.UPLOADS + "/products/");
const check_fields = ["name", "alias", "brands", "categories", "sizes", "structures", "tags", "colors", "count", "price"];

class ProductController {

  async getProducts(req, res) {
    try {
      const products = await productService.getProducts(req.query);
      responseDto.response = products.map(data => {
        return new productDto(data);
      });
      responseDto.page = { totalRecords: await productService.getTotal() };
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }

  async published(req, res, next) {
    try {
      const { _id, published } = req.body;
      if (!_id || published === undefined) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = new productDto(await productService.published(_id, published));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async getProductOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = new productDto(await productService.getProductOne(id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async postProduct(req, res, next) {
    try {
      const body = req.body;

      let success_field = true;
      let resultArray = [];
      check_fields.map(field => {
        if (!body[field]) {
          success_field = false;
        }
      });
      if (!success_field) return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));

      const product_check = await productService.getProductOneAlias(body.alias);
      if (product_check) {
        return next(apiError.BadRequest(codeErrors.alreadyExists.title, codeErrors.alreadyExists.code));
      }

      if (body?.image?.length > 0) {
        body?.image.map(e => {
          let imageObj = {};
          const binaryData = Buffer.from(e.img, "base64");
          const FILE = new Date().getTime().toString();// + body.image.title;

          sharp(binaryData)
            .resize({ width: 297 })
            .webp({ lossless: true })
            .toFile(DIR + FILE + "_catalog.webp");
          sharp(binaryData)
            .webp({ lossless: true })
            .toFile(DIR + FILE + "_desktop.webp");
          sharp(binaryData)
            .resize({ width: 1024 })
            .webp({ lossless: true })
            .toFile(DIR + FILE + "_tablet.webp");
          sharp(binaryData)
            .resize({ width: 768 })
            .webp({ lossless: true })
            .toFile(DIR + FILE + "_mobile.webp");

          imageObj.desktop = FILE + "_desktop.webp";
          imageObj.catalog = FILE + "_catalog.webp";
          imageObj.tablet = FILE + "_tablet.webp";
          imageObj.mobile = FILE + "_mobile.webp";
          resultArray.push(imageObj);
        });
      }
      body.image = resultArray.length > 0 ? resultArray : [];
      const product = await productService.createProduct(body);
      responseDto.response = new productDto(product);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async putProduct(req, res, next) {
    try {
      const putBody = req.body;
      if (!putBody.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      await productService.editProduct(req.body);
      responseDto.response = new productDto(await productService.getProductOne(putBody.id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteProductOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      const findProduct = await productService.getProductOne(id);
      if (!findProduct) {
        return next(apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code));
      }

      fs.unlink(DIR + findProduct.image.desktop, function(err) {
        err && console.log("err", err);
      });

      responseDto.response = await productService.deleteProductOne(id);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteProductMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);

      if (!ids.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      const findIds = await productService.getProductIds(ids.id);
      findIds.map(e => {
        fs.unlink(DIR + e.image.desktop, function(err) {
          err && console.log("err", err);
        });
      });

      await productService.deleteProductMany(ids.id);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProductController();