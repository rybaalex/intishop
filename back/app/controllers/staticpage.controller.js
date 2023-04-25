const staticPageService = require("../services/staticpage.service");
const apiError = require("../../exceptions/api-error");
const responseDto = require("../../dtos/response.dto");
const codeErrors = require("../../exceptions/code_errors");
const StaticPageDto = require("../../dtos/staticpage.dto");

class StaticPageController {
  async getStaticPages(req, res, next) {
    try {
      const staticPage = await staticPageService.getStaticPage(req.query);
      console.log("111", staticPage);
      if (staticPage.length === 0) {
        return next(apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code));
      }
      responseDto.response = staticPage.map(item => {
        return new StaticPageDto(item);
      });
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new StaticPageController();