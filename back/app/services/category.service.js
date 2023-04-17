const categoryModel = require("../../models/category.model");

class CategoryService {
  async getCategories(query) {
    const sort = JSON.parse(query.sort);
    const range = JSON.parse(query.range);
    const filter = JSON.parse(query.filter);
    if (filter.q) {
      filter.name = { $regex: filter.q };
      delete filter.q;
    }
    return categoryModel.find(filter).skip(range[0]).limit(range[1] - range[0]).sort([sort]);
  }

  async getTotal(query) {
    const filter = JSON.parse(query.filter);
    return categoryModel.find(filter).count();
  }
}

module.exports = new CategoryService();