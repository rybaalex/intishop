const categoryService = require("../services/category.service");
const apiError = require("../../../exceptions/api-error");
const responseDto = require("../../../dtos/response.dto");
const categoriesDto = require("../../../dtos/categories.dto");
const fs = require("fs");
const path = require("path");
const codeErrors = require("../../../exceptions/code_errors");

const DIR = path.join(__dirname + "../../../../" + process.env.UPLOADS + "/categories/");

class CategoryController {

  async getCategories(req, res) {
    try {
      const category = await categoryService.getCategories(req.query);
      responseDto.response = category.map(e => {
        return new categoriesDto(e);
      });
      responseDto.page = { totalRecords: await categoryService.getTotal(req.query) };
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }

  async getCategoryOne(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = new categoriesDto(await categoryService.getCategoryOne(id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async published(req, res, next) {
    try {
      const { _id, published } = req.body;
      if (!_id || published === undefined) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = new categoriesDto(await categoryService.published(_id, published));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async postCategory(req, res, next) {
    try {
      const body = req.body;
      if (!body.alias || !body.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      if (body?.image_menu_background?.img) {
        const FILE = new Date().getTime().toString() + body.image_menu_background.title;
        fs.writeFile(DIR + FILE, req.body.image_menu_background.img, "base64", () => {
        });
        body.image_menu_background.img = FILE;
      }
      body.alias = body.alias.toLowerCase().replaceAll(" ", "_");
      const category = await categoryService.createCategory(body);
      responseDto.response = new categoriesDto(category);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async putCategory(req, res, next) {
    try {
      const putBody = req.body;
      if (!putBody.alias || !putBody.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      const categoryCheckImages = await categoryService.getCategoryOne(putBody.id);

      if (putBody.image_menu_background) {
        if (categoryCheckImages.image_menu_background.title !== putBody.image_menu_background.title) {
          if (categoryCheckImages.image_menu_background.img) {
            fs.unlink(DIR + categoryCheckImages.image_menu_background.img, function(err) {
              err && console.log("err", err);
            });
          }

          const FILE = new Date().getTime().toString() + putBody.image_menu_background.title;
          fs.writeFile(DIR + FILE, req.body.image_menu_background.img, "base64", () => {
          });
          putBody.image_menu_background.img = FILE;
        }
      } else {
        fs.unlink(DIR + categoryCheckImages.image_menu_background.img, function(err) {
          err && console.log("err background", err);
        });
      }
      putBody.alias = putBody.alias.toLowerCase().replaceAll(" ", "_");
      await categoryService.editCategory(putBody);
      responseDto.response = new categoriesDto(await categoryService.getCategoryOne(putBody.id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteCategoryOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = await categoryService.deleteCategoryOne(id, DIR);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }

  }

  async deleteCategoryMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);
      if (!ids.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      await categoryService.deleteCategoryMany(ids.id, DIR);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CategoryController();