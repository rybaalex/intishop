const countryService = require("../services/country.service");
const apiError = require("../../../exceptions/api-error");
const responseDto = require("../../../dtos/response.dto");
const countryDto = require("../../../dtos/country.dto");
const sharp = require("sharp");
const codeErrors = require("../../../exceptions/code_errors");
const path = require("path");
const DIR = path.join(__dirname + "../../../../" + process.env.UPLOADS + "/country/");
const { transliterate } = require("../../../utils/helpers.ts");
const fs = require("fs");


class CountryController {

  async getCountries(req, res) {
    try {
      const country = await countryService.getCountries(req.query);
      responseDto.response = country.map(e => {
        return new countryDto(e);
      });
      responseDto.page = { totalRecords: await countryService.getTotal() };
      //responseDto.page = brand.pageInfo;
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }

  async getCountryOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = new countryDto(await countryService.getCountryOne(id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async postCountry(req, res, next) {
    try {
      const body = req.body;

      if (!body.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      if (body?.image?.img) {
        const binaryData = Buffer.from(req.body.image.img, "base64");
        const FILE = new Date().getTime().toString();// + body.image.title;
        sharp(binaryData)
          .resize({ height: 20 })
          .webp({ lossless: true })
          .toFile(DIR + FILE + ".webp");
        body.image = FILE + ".webp";
      }

      body.code = transliterate(body.name.toLowerCase().replaceAll(" ", "_"));
      const country = await countryService.createCountry(body);
      responseDto.response = new countryDto(country);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async putCountry(req, res, next) {
    try {
      const putBody = req.body;
      if (!putBody.code || !putBody.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      const countryCheckImages = await countryService.getCountryOne(putBody.id);
      if (putBody.image) {
        if (countryCheckImages.image) {
          fs.unlink(DIR + countryCheckImages.image, function(err) {
            err && console.log("err", err);
          });
        }
        const binaryData = Buffer.from(putBody.image.img, "base64");
        const FILE = new Date().getTime().toString();// + body.image.title;
        sharp(binaryData)
          .resize({ height: 20 })
          .webp({ lossless: true })
          .toFile(DIR + FILE + ".webp");
        putBody.image = FILE + ".webp";
      } else {
        fs.unlink(DIR + countryCheckImages.image, function(err) {
          err && console.log("err", err);
        });
      }

      await countryService.editCountry(putBody);
      responseDto.response = new countryDto(await countryService.getCountryOne(putBody.id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteCountryOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      const findId = await countryService.getCountryOne(id);

      fs.unlink(DIR + findId.image, function(err) {
        err && console.log("err", err);
      });

      responseDto.response = await countryService.deleteCountryOne(id, DIR);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteCountryMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);
      if (!ids.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      const findIds = await countryService.getCountryIds(ids.id);
      findIds.map(e => {
        fs.unlink(DIR + e.image, function(err) {
          err && console.log("err", err);
        });
      });

      await countryService.deleteCountryMany(ids.id, DIR);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CountryController();