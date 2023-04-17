const categoryService = require("../services/category.service");
const responseDto = require("../../dtos/response.dto");
const categoriesDto = require("../../dtos/categories.dto");
const apiError = require("../../exceptions/api-error");
const codeErrors = require("../../exceptions/code_errors");

class CategoryController {

  async getCategories(req, res, next) {
    try {
      const category = await categoryService.getCategories(req.query);
      if (category.length === 0) {
        return next(apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code));
      }
      responseDto.response = category.map(e => {
        return new categoriesDto(e);
      });
      responseDto.page = { totalRecords: await categoryService.getTotal(req.query) };
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }
}

module.exports = new CategoryController();