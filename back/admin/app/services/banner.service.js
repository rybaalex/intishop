const bannerModel = require("../../../models/banner.model");
const apiError = require("../../../exceptions/api-error");
const fs = require("fs");
const codeErrors = require("../../../exceptions/code_errors");


class BannerService {
  async getBanners(query) {
    const sort = JSON.parse(query.sort);
    const range = JSON.parse(query.range);
    const filter = JSON.parse(query.filter);
    return bannerModel.find(filter).skip(range[0]).limit(range[1] - range[0]).sort([sort]);
  }

  async getTotal(query) {
    const filter = JSON.parse(query.filter);
    return bannerModel.find(filter).count();
  }

  async getBannerOne(id) {
    return bannerModel.findOne({ _id: id });
  }

  async published(_id, published) {
    const banner = await bannerModel.findOne({ _id });
    if (!banner) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    banner.published = published;
    await banner.save();
    return banner;
  }

  async createBanner(body) {
    const { name } = body;
    const findBanner = await bannerModel.findOne({
      name: name
    });
    if (findBanner) {
      throw apiError.BadRequest(codeErrors.alreadyExists.title, codeErrors.alreadyExists.code);
    }

    return bannerModel.create(body);
  }

  async editBanner(body) {
    const { id } = body;
    const findBanner = await bannerModel.findOne({ _id: id });
    if (!findBanner) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return bannerModel.updateOne({ _id: id }, {
      $set: {
        name: body.name,
        sort: body.sort,
        image: body.image,
        url: body.url
      }
    });
  }

  async deleteBannerOne(_id, DIR) {
    const findBanner = await bannerModel.findOne({ _id });
    if (!findBanner) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    fs.unlink(DIR + findBanner.image.img, function(err) {
      err && console.log("err", err);
    });
    return bannerModel.deleteOne({ _id });
  }

  async deleteBannerMany(ids, DIR) {
    const findBanner = await bannerModel.find({ _id: ids });

    findBanner.map(e => {
      fs.unlink(DIR + e.image.img, function(err) {
        err && console.log("err", err);
      });
    });

    return bannerModel.deleteMany({ _id: ids });
  }
}

module.exports = new BannerService();