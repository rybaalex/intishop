const stockModel = require("../../../models/stock.model");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");
const bannerModel = require("../../../models/banner.model");


class StockService {
  async getStocks(query) {
    const sort = JSON.parse(query.sort);
    const range = JSON.parse(query.range);
    return stockModel.find().populate("type").skip(range[0]).limit(range[1] - range[0]).sort([sort]);
  }

  async getStocksIds(ids) {
    return stockModel.find({ _id: ids });
  }

  async getTotal() {
    return stockModel.find().count();
  }

  async published(_id, published) {
    const stock = await stockModel.findOne({ _id });
    if (!stock) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    stock.published = published;
    await stock.save();
    return stock;
  }

  async getStockOne(id) {
    return stockModel.findOne({ _id: id });
  }

  async createStock(body) {
    return stockModel.create(body);
  }

  async editStock(body) {
    const { id } = body;
    const findStock = await stockModel.findOne({ _id: id });
    if (!findStock) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return stockModel.updateOne({ _id: id }, {
      $set: {
        description: body.description,
        type: body.type,
        image: body.image,
        url: body.url
      }
    });
  }

  async deleteStockOne(_id) {
    return stockModel.deleteOne({ _id });
  }

  async deleteStockMany(ids) {
    return stockModel.deleteMany({ _id: ids });
  }
}

module.exports = new StockService();