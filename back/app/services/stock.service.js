const stockModel = require("../../models/stock.model");

class RoleService {

  async getStocks() {
    return stockModel.find().populate("type");
  }
}

module.exports = new RoleService();