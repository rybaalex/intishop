const colorModel = require("../../../models/color.model");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");


class ColorService {
  async getColors(query) {
    const sort = JSON.parse(query.sort);
    const range = JSON.parse(query.range);
    return colorModel.find().skip(range[0]).limit(range[1] - range[0]).sort([sort]);
  }

  async getTotal() {
    return colorModel.find().count();
  }

  async getColorOne(id) {
    return colorModel.findOne({ _id: id });
  }

  async published(_id, published) {
    const color = await colorModel.findOne({ _id });
    if (!color) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    color.published = published;
    await color.save();
    return color;
  }

  async createColor(body) {
    const { code } = body;
    const findColor = await colorModel.findOne({ code: code });
    if (findColor) {
      throw apiError.BadRequest(codeErrors.alreadyExists.title, codeErrors.alreadyExists.code);
    }
    return colorModel.create(body);
  }

  async editColor(body) {
    const { id } = body;
    const findColor = await colorModel.findOne({ _id: id });
    if (!findColor) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return colorModel.updateOne({ _id: id }, {
      $set: {
        name: body.name,
        code: body.code,
        sort: body.sort
      }
    });
  }

  async deleteColorOne(_id) {
    const findColor = await colorModel.findOne({ _id });
    if (!findColor) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return colorModel.deleteOne({ _id });
  }

  async deleteColorMany(ids) {
    return colorModel.deleteMany({ _id: ids });
  }
}

module.exports = new ColorService();