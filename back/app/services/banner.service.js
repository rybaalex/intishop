const bannerModel = require("../../models/banner.model");

class BannerService {
  async getBanners(query) {
    const filter = JSON.parse(query.filter);
    const sort = JSON.parse(query.sort);
    return bannerModel.find(filter).sort([sort]);
  }
}

module.exports = new BannerService();