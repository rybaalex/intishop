const brandService = require("../services/brand.service");
const ApiError = require("../../../exceptions/api-error");
const responseDto = require("../../../dtos/response.dto");
const brandsDto = require("../../../dtos/brands.dto");
const sharp = require("sharp");
const CodeErrors = require("../../../exceptions/code_errors");
const fs = require("fs");
const path = require("path");
const { transliterate } = require("../../../utils/helpers.ts");
const brandModel = require("../../../models/brand.model");
const DIR = path.join(__dirname + "../../../../" + process.env.UPLOADS + "/brands/");

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

      if (!body.name || !body.countryId) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }
      if (body?.image?.img) {
        const binaryData = Buffer.from(body.image.img, "base64");
        const FILE = new Date().getTime().toString();// + body.image.title;
        sharp(binaryData)
          .webp({ lossless: true })
          .toFile(DIR + FILE + ".webp");
        body.image = FILE + ".webp";
      }

      body.alias = transliterate(body.name.toLowerCase().replaceAll(" ", "_"));
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
      if (!putBody.name || !putBody.countryId) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }

      const brandCheckImages = await brandService.getBrandOne(putBody.id);

      if (putBody?.image?.img) {
        fs.unlink(DIR + brandCheckImages.image, function(err) {
          err && console.log("err", err);
        });
        const binaryData = Buffer.from(putBody.image.img, "base64");
        const FILE = new Date().getTime().toString();// + body.image.title;
        sharp(binaryData)
          .webp({ lossless: true })
          .toFile(DIR + FILE + ".webp");
        putBody.image = FILE + ".webp";
        /*          fs.writeFile(DIR + FILE, req.body.logo.img, "base64", () => {
                  });*/
      } else {
        fs.unlink(DIR + brandCheckImages.image, function(err) {
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
      const findBrand = await brandService.getBrandOne(id);
      fs.unlink(DIR + findBrand.image, function(err) {
        err && console.log("err", err);
      });
      responseDto.response = await brandService.deleteBrandOne(id);
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

      const findBrand = await brandService.getBrandIds(ids.id);

      if (findBrand.length === 0) {
        return next(ApiError.BadRequest(CodeErrors.noDataFound.code, CodeErrors.noDataFound.title));
      }
      findBrand.map(e => {
        fs.unlink(DIR + e.image, function(err) {
          err && console.log("err", err);
        });
      });

      await brandService.deleteBrandMany(ids.id);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BrandController();