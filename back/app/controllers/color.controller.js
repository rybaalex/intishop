const colorService = require("../services/color.service");
const responseDto = require("../dtos/response.dto");
const colorsDto = require("../dtos/colors.dto");
const apiError = require("../exceptions/api-error");
const codeErrors = require("../exceptions/code_errors");

class ColorController {

  async getColors(req, res) {
    try {
      const color = await colorService.getColors(req.query);
      responseDto.response = color.map(e => {
        return new colorsDto(e);
      });
      responseDto.page = { totalRecords: await colorService.getTotal() };
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }

  async getColorOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = new colorsDto(await colorService.getColorOne(id));
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
      responseDto.response = new colorsDto(await colorService.published(_id, published));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async postColor(req, res, next) {
    try {
      const body = req.body;

      if (!body.code || !body.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      body.code = body.code.toLowerCase().replaceAll(" ", "_");
      const color = await colorService.createColor(body);
      responseDto.response = new colorsDto(color);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async putColor(req, res, next) {
    try {
      const putBody = req.body;
      if (!putBody.code || !putBody.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      await colorService.editColor(putBody);
      responseDto.response = new colorsDto(await colorService.getColorOne(putBody.id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteColorOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = await colorService.deleteColorOne(id);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }

  }

  async deleteColorMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);
      if (!ids.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      await colorService.deleteColorMany(ids.id);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ColorController();