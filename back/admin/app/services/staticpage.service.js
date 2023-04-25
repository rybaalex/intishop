const StaticPageModel = require("../../../models/staticpage.model");

class StaticPageService {
  async getStaticPages(query) {
    const filter = JSON.parse(query.filter);
    const sort = JSON.parse(query.sort);
    return StaticPageModel.find(filter).sort([sort]);
  }
}

module.exports = new StaticPageService();