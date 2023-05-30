const brandModel = require("../../../models/brand.model");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");

class BrandService {
  async getBrands(query) {
    const sort = JSON.parse(query.sort);
    const range = JSON.parse(query.range);
    return brandModel.find().populate("countryId").skip(range[0]).limit(range[1] - range[0]).sort([sort]);
  }

  async getTotal() {
   return brandModel.find().count();
  }

  async getBrandOne(id) {
    return brandModel.findOne({ _id: id });
  }
  async getBrandIds(ids) {
    return brandModel.find({ _id: ids });
  }
  async published(_id, published) {
    const brand = await brandModel.findOne({ _id });
    if (!brand) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    brand.published = published;
    await brand.save();
    return brand;
  }

  async createBrand(body) {
    const { alias } = body;
    const findBrand = await brandModel.findOne({
      alias: alias
    });
    if (findBrand) {
      throw apiError.BadRequest(codeErrors.alreadyExists.title, codeErrors.alreadyExists.code);
    }

    return brandModel.create(body);
  }

  async editBrand(body) {
    const { id } = body;
    const findBrand = await brandModel.findOne({ _id: id });
    if (!findBrand) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return brandModel.updateOne({ _id: id }, {
      $set: {
        name: body.name,
        description: body.description,
        sort: body.sort,
        image: body.image,
        alias: body.alias,
        countryId: body.countryId
      }
    });
  }

  async deleteBrandOne(_id) {
    const findBrand = await brandModel.findOne({ _id });
    if (!findBrand) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }

    return brandModel.deleteOne({ _id });
  }

  async deleteBrandMany(ids, DIR) {
    return brandModel.deleteMany({ _id: ids });
  }
}


module.exports = new BrandService();