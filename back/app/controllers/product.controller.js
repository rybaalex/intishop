const productService = require("../services/product.service");
const responseDto = require("../../dtos/response.dto");
const productDto = require("../../dtos/product.dto");
const apiError = require("../../exceptions/api-error");
const codeErrors = require("../../exceptions/code_errors");

class ProductController {
  async getProducts(req, res, next) {
    try {
      const products = await productService.getProducts(req.query);
      console.log("+++", req.query, products);
      if (products.length === 0) {
        return next(apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code));
      }
      responseDto.response = products.map(e => {
        return new productDto(e);
      });
      responseDto.page = { totalRecords: await productService.getTotal(req.query) };
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }
}

module.exports = new ProductController();