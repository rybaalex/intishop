const tagModel = require("../models/tags.model");
const apiError = require("../exceptions/api-error");
const codeErrors = require("../exceptions/code_errors");


class TagService {
  async getTags(query) {
    const sort = JSON.parse(query.sort);
    const range = JSON.parse(query.range);
    return tagModel.find().skip(range[0]).limit(range[1] - range[0]).sort([sort]);
  }

  async getTotal() {
    return tagModel.find().count();
  }

  async getTagOne(id) {
    return tagModel.findOne({ _id: id });
  }

  async published(_id, published) {
    const tag = await tagModel.findOne({ _id });
    if (!tag) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    tag.published = published;
    await tag.save();
    return tag;
  }

  async createTag(body) {
    const { code } = body;
    const findTag = await tagModel.findOne({ code: code });
    if (findTag) {
      throw apiError.BadRequest(codeErrors.alreadyExists.title, codeErrors.alreadyExists.code);
    }
    return tagModel.create(body);
  }

  async editTag(body) {
    const { id } = body;
    const findTag = await tagModel.findOne({ _id: id });
    if (!findTag) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return tagModel.updateOne({ _id: id }, {
      $set: {
        name: body.name,
        code: body.code,
        sort: body.sort
      }
    });
  }

  async deleteTagOne(_id) {
    const findTag = await tagModel.findOne({ _id });
    if (!findTag) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return tagModel.deleteOne({ _id });
  }

  async deleteTagMany(ids) {
    return tagModel.deleteMany({ _id: ids });
  }
}

module.exports = new TagService();