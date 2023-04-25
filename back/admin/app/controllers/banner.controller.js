const bannerService = require("../services/banner.service");
const apiError = require("../../../exceptions/api-error");
const responseDto = require("../../../dtos/response.dto");
const bannersDto = require("../../../dtos/banners.dto");
const fs = require("fs");
const path = require("path");
const codeErrors = require("../../../exceptions/code_errors");

const DIR = path.join(__dirname + "../../../../" + process.env.UPLOADS + "/banners/");

class BannerController {

  async getBanners(req, res) {
    try {
      const banner = await bannerService.getBanners(req.query);
      responseDto.response = banner.map(e => {
        return new bannersDto(e);
      });
      responseDto.page = { totalRecords: await bannerService.getTotal(req.query) };
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }

  async getBannerOne(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = new bannersDto(await bannerService.getBannerOne(id));
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
      responseDto.response = new bannersDto(await bannerService.published(_id, published));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async postBanner(req, res, next) {
    try {
      const body = req.body;
      if (!body.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      if (body?.image?.img) {
        const FILE = new Date().getTime().toString() + body.image.title;
        fs.writeFile(DIR + FILE, req.body.image.img, "base64", () => {
        });
        body.image.img = FILE;
      }
      const banner = await bannerService.createBanner(body);
      responseDto.response = new bannersDto(banner);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async putBanner(req, res, next) {
    try {
      const putBody = req.body;
      if (!putBody.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      const bannerCheckImages = await bannerService.getBannerOne(putBody.id);

      if (putBody.image) {
        if (bannerCheckImages.image.title !== putBody.image.title) {
          if (bannerCheckImages.image.img) {
            fs.unlink(DIR + bannerCheckImages.image.img, function(err) {
              err && console.log("err", err);
            });
          }

          const FILE = new Date().getTime().toString() + putBody.image.title;
          fs.writeFile(DIR + FILE, req.body.image.img, "base64", () => {
          });
          putBody.image.img = FILE;
        }
      } else {
        fs.unlink(DIR + bannerCheckImages.image.img, function(err) {
          err && console.log("err background", err);
        });
      }
      await bannerService.editBanner(putBody);
      responseDto.response = new bannersDto(await bannerService.getBannerOne(putBody.id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteBannerOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = await bannerService.deleteBannerOne(id, DIR);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }

  }

  async deleteBannerMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);
      if (!ids.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      await bannerService.deleteBannerMany(ids.id, DIR);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BannerController();