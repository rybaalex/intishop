const bannerService = require("../services/banner.service");
const responseDto = require("../../dtos/response.dto");
const bannersDto = require("../../dtos/banners.dto");
const apiError = require("../../exceptions/api-error");
const codeErrors = require("../../exceptions/code_errors");

class BannerController {
  async getBanners(req, res, next) {
    try {
      const banner = await bannerService.getBanners(req.query);
      if (banner.length === 0) {
        return next(apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code));
      }
      responseDto.response = banner.map(e => {
        return new bannersDto(e);
      });
      responseDto.page = [];
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }
}

module.exports = new BannerController();