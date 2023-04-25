const staticPageModel = require("../../models/staticpage.model");

class StaticPageService {

  async getStaticPage(query) {
    const filter = JSON.parse(query.filter);
    const sort = JSON.parse(query.sort);
    console.log("12", filter, sort);
    return staticPageModel.find(filter).sort([sort]);
  }
}

module.exports = new StaticPageService();