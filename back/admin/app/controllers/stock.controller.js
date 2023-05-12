const stockService = require("../services/stock.service");
const responseDto = require("../../../dtos/response.dto");
const stockDto = require("../../../dtos/stock.dto");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const bannerModel = require("../../../models/banner.model");
const DIR = path.join(__dirname + "../../../../" + process.env.UPLOADS + "/stocks/");
const size_img = "297";

class StockController {

  async getStocks(req, res) {
    try {
      const stocks = await stockService.getStocks(req.query);
      responseDto.response = stocks.map(data => {
        return new stockDto(data);
      });
      responseDto.page = { totalRecords: await stockService.getTotal() };
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
      responseDto.response = new stockDto(await stockService.published(_id, published));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async getStockOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = new stockDto(await stockService.getStockOne(id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async postStock(req, res, next) {
    try {
      const body = req.body;
      if (!body.type || !body.description || !body.sort) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      if (body?.image?.img) {
        const binaryData = Buffer.from(req.body.image.img, "base64");
        const FILE = new Date().getTime().toString();// + body.image.title;
        sharp(binaryData)
          .resize({ width: 297 })
          .webp({ lossless: true })
          .toFile(DIR + FILE + "_" + size_img + ".webp");
        body.image.desktop = FILE + "_" + size_img + ".webp";
        body.image.tablet = FILE + "_" + size_img + ".webp";
        body.image.mobile = FILE + "_" + size_img + ".webp";
      }

      const stock = await stockService.createStock(body);
      responseDto.response = new stockDto(stock);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async putStock(req, res, next) {
    try {
      const putBody = req.body;
      if (!putBody.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      await stockService.editStock(req.body);
      responseDto.response = new stockDto(await stockService.getStockOne(putBody.id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteStockOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      const findStock = await stockService.getStockOne(id);
      if (!findStock) {
        return next(apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code));
      }

      fs.unlink(DIR + findStock.image.desktop, function(err) {
        err && console.log("err", err);
      });

      responseDto.response = await stockService.deleteStockOne(id);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteStockMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);

      if (!ids.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      const findIds = await stockService.getStocksIds(ids.id);
      findIds.map(e => {
        fs.unlink(DIR + e.image.desktop, function(err) {
          err && console.log("err", err);
        });
      });

      await stockService.deleteStockMany(ids.id);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new StockController();