const StaticPageModel = require("../../models/staticpage.model");
const ApiError = require("../../exceptions/api-error");

class StaticPageService {

  async getStaticPage(query) {
    const filter = JSON.parse(query.filter);
    return StaticPageModel.find(filter);
  }
}

module.exports = new StaticPageService();