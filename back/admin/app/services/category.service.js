const categoryModel = require("../../../models/category.model");
const apiError = require("../../../exceptions/api-error");
const fs = require("fs");
const codeErrors = require("../../../exceptions/code_errors");


class CategoryService {
  async getCategories(query) {
    const sort = JSON.parse(query.sort);
    const range = JSON.parse(query.range);
    const filter = JSON.parse(query.filter);
    if (filter.q) {
      filter.name = { $regex: filter.q };
      delete filter.q;
    }
    return categoryModel.find(filter).skip(range[0]).limit(range[1] - range[0]).sort([sort]);
  }

  async getTotal(query) {
    const filter = JSON.parse(query.filter);
    return categoryModel.find(filter).count();
  }

  async getCategoryOne(id) {
    return categoryModel.findOne({ _id: id });
  }

  async published(_id, published) {
    const category = await categoryModel.findOne({ _id });
    if (!category) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    category.published = published;
    await category.save();
    return category;
  }

  async createCategory(body) {
    const { alias } = body;
    const findCategory = await categoryModel.findOne({
      alias: alias
    });
    if (findCategory) {
      throw apiError.BadRequest(codeErrors.alreadyExists.title, codeErrors.alreadyExists.code);
    }

    return categoryModel.create(body);
  }

  async editCategory(body) {
    const { id } = body;
    const findCategory = await categoryModel.findOne({ _id: id });
    if (!findCategory) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return categoryModel.updateOne({ _id: id }, {
      $set: {
        name: body.name,
        description: body.description,
        sort: body.sort,
        logo: body.logo,
        image_menu_background: body.image_menu_background,
        alias: body.alias,
        parent_id: body.parent_id
      }
    });
  }

  async deleteCategoryOne(_id, DIR) {
    const findCategory = await categoryModel.findOne({ _id });
    if (!findCategory) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    fs.unlink(DIR + findCategory.logo.img, function(err) {
      err && console.log("err", err);
    });
    fs.unlink(DIR + findCategory.image_menu_background.img, function(err) {
      err && console.log("err", err);
    });
    return categoryModel.deleteOne({ _id });
  }

  async deleteCategoryMany(ids, DIR) {
    const findCategory = await categoryModel.find({ _id: ids });

    findCategory.map(e => {
      fs.unlink(DIR + e.logo.img, function(err) {
        err && console.log("err", err);
      });
      fs.unlink(DIR + e.image_menu_background.img, function(err) {
        err && console.log("err", err);
      });
    });

    return categoryModel.deleteMany({ _id: ids });
  }
}

module.exports = new CategoryService();