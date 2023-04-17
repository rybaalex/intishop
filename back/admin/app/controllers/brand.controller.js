const brandService = require("../services/brand.service");
const ApiError = require("../../../exceptions/api-error");
const responseDto = require("../../../dtos/response.dto");
const brandsDto = require("../../../dtos/brands.dto");

const CodeErrors = require("../../../exceptions/code_errors");
const fs = require("fs");
const path = require("path");
const DIR = path.join(__dirname + "../../../" + process.env.UPLOADS + "/brands/");


class BrandController {

  async getBrands(req, res) {
    try {
      const brand = await brandService.getBrands(req.query);
      responseDto.response = brand.map(e => {
        return new brandsDto(e);
      });
      responseDto.page = { totalRecords: await brandService.getTotal() };
      //responseDto.page = brand.pageInfo;
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }

  async getBrandOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }
      responseDto.response = new brandsDto(await brandService.getBrandOne(id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async published(req, res, next) {
    try {
      const { _id, published } = req.body;
      if (!_id || published === undefined) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }
      responseDto.response = new brandsDto(await brandService.published(_id, published));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async postBrand(req, res, next) {
    try {
      const body = req.body;

      if (!body.alias || !body.name) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }

      if (body?.logo?.img) {
        const FILE = new Date().getTime().toString() + body.logo.title;
        fs.writeFile(DIR + FILE, req.body.logo.img, "base64", () => {
        });
        body.logo.img = FILE;
      }
      body.alias = body.alias.toLowerCase().replaceAll(" ", "_");
      const brand = await brandService.createBrand(body);
      responseDto.response = new brandsDto(brand);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async putBrand(req, res, next) {
    try {
      const putBody = req.body;
      if (!putBody.alias || !putBody.name) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }

      const brandCheckImages = await brandService.getBrandOne(putBody.id);

      if (putBody.logo) {
        if (brandCheckImages.logo.title !== putBody.logo.title) {
          fs.unlink(DIR + brandCheckImages.logo.img, function(err) {
            err && console.log("err", err);
          });
          const FILE = new Date().getTime().toString() + putBody.logo.title;
          fs.writeFile(DIR + FILE, req.body.logo.img, "base64", () => {
          });
          putBody.logo.img = FILE;
        }
      } else {
        fs.unlink(DIR + brandCheckImages.logo.img, function(err) {
          err && console.log("err", err);
        });
      }

      await brandService.editBrand(putBody);
      responseDto.response = new brandsDto(await brandService.getBrandOne(putBody.id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteBrandOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }
      responseDto.response = await brandService.deleteBrandOne(id, DIR);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }

  }

  async deleteBrandMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);
      if (!ids.id) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }
      await brandService.deleteBrandMany(ids.id, DIR);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BrandController();