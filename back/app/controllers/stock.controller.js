const stockService = require("../services/stock.service");
const apiError = require("../../exceptions/api-error");
const responseDto = require("../../dtos/response.dto");
const stockDto = require("../../dtos/stock.dto");
const codeErrors = require("../../exceptions/code_errors");

class StocksController {
  async getStocks(req, res, next) {
    try {
      const stocks = await stockService.getStocks();
      if (stocks.length === 0) {
        return next(apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code));
      }

      responseDto.response = stocks.map(d => new stockDto(d));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new StocksController();