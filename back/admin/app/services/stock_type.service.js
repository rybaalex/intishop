const stockTypeModel = require("../../../models/stock_type.model");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");


class StockTypeService {
  async getStockTypes(query) {

    const sort = query.sort ? JSON.parse(query?.sort) : [];
    const range = query.range ? JSON.parse(query?.range) : 0;
    const filter = JSON.parse(query?.filter);
    const resFilter = {};
    if (filter.ids) {
      resFilter._id = filter.ids;
    }
    return stockTypeModel.find(resFilter).skip(range[0] ? range[0] : 0).limit(range ? range[1] - range[0] : 0).sort([sort ? sort : []]);
  }

  async getTotal() {
    return stockTypeModel.find().count();
  }

  async getStockTypeOne(id) {
    return stockTypeModel.findOne({ _id: id });
  }

  async createStockType(body) {
    const { code } = body;
    const findStockType = await stockTypeModel.findOne({ code: code });
    if (findStockType) {
      throw apiError.BadRequest(codeErrors.alreadyExists.title, codeErrors.alreadyExists.code);
    }
    return stockTypeModel.create(body);
  }

  async editStockType(body) {
    const { id } = body;
    const findStockType = await stockTypeModel.findOne({ _id: id });
    if (!findStockType) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return stockTypeModel.updateOne({ _id: id }, {
      $set: {
        code: body.code,
        title: body.title,
        background: body.background,
        color: body.color
      }
    });
  }

  async deleteStockTypeOne(_id) {
    const findStockType = await stockTypeModel.findOne({ _id });
    if (!findStockType) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return stockTypeModel.deleteOne({ _id });
  }

  async deleteStockTypeMany(ids) {
    return stockTypeModel.deleteMany({ _id: ids });
  }
}

module.exports = new StockTypeService();