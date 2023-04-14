const staticPageService = require("../services/staticpage.service");
const ApiError = require("../exceptions/api-error");
const responseDto = require("../dtos/response.dto");

class StaticPageController {
  async getStaticPage(req, res, next) {
    try {
      const staticPage = await staticPageService.getStaticPage();
      if (staticPage.length === 0) {
        return next(ApiError.BadRequest("Нет данных", 405));
      }
      responseDto.response = staticPage;
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new StaticPageController();