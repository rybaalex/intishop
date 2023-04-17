const StaticPageModel = require("../../../models/staticpage.model");
const ApiError = require("../../../exceptions/api-error");

class StaticPageService {

  async getStaticPage() {
    return StaticPageModel.find();
  }
}

module.exports = new StaticPageService();