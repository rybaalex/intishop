const stockTypeService = require("../services/stock_type.service");
const responseDto = require("../../../dtos/response.dto");
const stockTypeDto = require("../../../dtos/stockType.dto");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");

class StockTypeController {

  async getStockTypes(req, res) {
    try {
      const stockTypes = await stockTypeService.getStockTypes(req.query);
      responseDto.response = stockTypes.map(data => {
        return new stockTypeDto(data);
      });
      responseDto.page = { totalRecords: await stockTypeService.getTotal() };
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }

  async getStockTypeOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = new stockTypeDto(await stockTypeService.getStockTypeOne(id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async postStockType(req, res, next) {
    try {
      const body = req.body;

      if (!body.code || !body.title) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      body.code = body.code.toLowerCase().replaceAll(" ", "_");
      const stockType = await stockTypeService.createStockType(body);
      responseDto.response = new stockTypeDto(stockType);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async putStockType(req, res, next) {
    try {
      const putBody = req.body;
      if (!putBody.code || !putBody.title) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      await stockTypeService.editStockType(putBody);
      responseDto.response = new stockTypeDto(await stockTypeService.getStockTypeOne(putBody.id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteStockTypeOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = await stockTypeService.deleteStockTypeOne(id);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteStockTypeMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);
      if (!ids.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      await stockTypeService.deleteStockTypeMany(ids.id);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new StockTypeController();