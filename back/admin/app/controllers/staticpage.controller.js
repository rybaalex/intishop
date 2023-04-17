const staticPageService = require("../services/staticpage.service");
const apiError = require("../../../exceptions/api-error");
const responseDto = require("../../../dtos/response.dto");
const codeErrors = require("../../../exceptions/code_errors");

class StaticPageController {
  async getStaticPage(req, res, next) {
    try {
      const staticPage = await staticPageService.getStaticPage();
      if (staticPage.length === 0) {
        return next(apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code));
      }
      responseDto.response = staticPage;
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new StaticPageController();