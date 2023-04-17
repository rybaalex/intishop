const BrandModel = require("../../../models/brand.model");
const ApiError = require("../../../exceptions/api-error");
const fs = require("fs");
const CodeErrors = require("../../../exceptions/code_errors");


class BrandService {
  async getBrands(query) {
    const sort = JSON.parse(query.sort);
    const range = JSON.parse(query.range);
    return BrandModel.find().skip(range[0]).limit(range[1] - range[0]).sort([sort]);
  }

  async getTotal() {
   return BrandModel.find().count();
  }

  async getBrandOne(id) {
    return BrandModel.findOne({ _id: id });
  }

  async published(_id, published) {
    const brand = await BrandModel.findOne({ _id });
    if (!brand) {
      throw ApiError.BadRequest(CodeErrors.noDataFound.title, CodeErrors.noDataFound.code);
    }
    brand.published = published;
    await brand.save();
    return brand;
  }

  async createBrand(body) {
    const { alias } = body;
    const findBrand = await BrandModel.findOne({
      alias: alias
    });
    if (findBrand) {
      throw ApiError.BadRequest(CodeErrors.alreadyExists.title, CodeErrors.alreadyExists.code);
    }

    return BrandModel.create(body);
  }

  async editBrand(body) {
    const { id } = body;
    const findBrand = await BrandModel.findOne({ _id: id });
    if (!findBrand) {
      throw ApiError.BadRequest(CodeErrors.noDataFound.title, CodeErrors.noDataFound.code);
    }
    return BrandModel.updateOne({ _id: id }, {
      $set: {
        name: body.name,
        description: body.description,
        sort: body.sort,
        logo: body.logo,
        alias: body.alias
      }
    });
  }

  async deleteBrandOne(_id, DIR) {
    const findBrand = await BrandModel.findOne({ _id });
    if (!findBrand) {
      throw ApiError.BadRequest(CodeErrors.noDataFound.title, CodeErrors.noDataFound.code);
    }
    fs.unlink(DIR + findBrand.logo.img, function(err) {
      err && console.log("err", err);
    });
    return BrandModel.deleteOne({ _id });
  }

  async deleteBrandMany(ids, DIR) {
    const findBrand = await BrandModel.find({ _id: ids });

    findBrand.map(e => {
      fs.unlink(DIR + e.logo.img, function(err) {
        err && console.log("err", err);
      });
    });

    return BrandModel.deleteMany({ _id: ids });
  }
}


module.exports = new BrandService();