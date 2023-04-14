const labelModel = require("../models/label.model");
const apiError = require("../exceptions/api-error");
const codeErrors = require("../exceptions/code_errors");

class LabelService {
  async getLabels(query) {
    const sort = JSON.parse(query.sort);
    const range = JSON.parse(query.range);
    return labelModel.find().skip(range[0]).limit(range[1] - range[0]).sort([sort]);
  }

  async getTotal() {
    return labelModel.find().count();
  }

  async getLabelOne(id) {
    return labelModel.findOne({ _id: id });
  }

  async createLabel(body) {
    const { code } = body;
    const findLabel = await labelModel.findOne({ code: code });
    if (findLabel) {
      throw apiError.BadRequest(codeErrors.alreadyExists.title, codeErrors.alreadyExists.code);
    }
    return labelModel.create(body);
  }

  async editLabel(body) {
    const { id } = body;
    const findLabel = await labelModel.findOne({ _id: id });
    if (!findLabel) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return labelModel.updateOne({ _id: id }, {
      $set: {
        name: body.name,
        code: body.code,
        sort: body.sort
      }
    });
  }

  async deleteLabelOne(_id) {
    const findLabel = await labelModel.findOne({ _id });
    if (!findLabel) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return labelModel.deleteOne({ _id });
  }

  async deleteLabelMany(ids) {
    return labelModel.deleteMany({ _id: ids });
  }
}

module.exports = new LabelService();