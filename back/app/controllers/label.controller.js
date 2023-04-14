const labelService = require("../services/label.service");
const responseDto = require("../dtos/response.dto");
const labelsDto = require("../dtos/labels.dto");
const apiError = require("../exceptions/api-error");
const codeErrors = require("../exceptions/code_errors");

class LabelController {
  async getLabels(req, res) {
    try {
      const label = await labelService.getLabels(req.query);
      responseDto.response = label.map(e => {
        return new labelsDto(e);
      });
      responseDto.page = { totalRecords: await labelService.getTotal() };
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }

  async getLabelOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = new labelsDto(await labelService.getLabelOne(id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async postLabel(req, res, next) {
    try {
      const body = req.body;

      if (!body.code_color || !body.code_background || !body.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      const label = await labelService.createLabel(body);
      responseDto.response = new labelsDto(label);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async putLabel(req, res, next) {
    try {
      const putBody = req.body;
      if (!putBody.code_color || !putBody.code_background || !putBody.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      await labelService.editLabel(putBody);
      responseDto.response = new labelsDto(await labelService.getLabelOne(putBody.id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteLabelOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = await labelService.deleteLabelOne(id);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteLabelMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);
      if (!ids.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      await labelService.deleteLabelMany(ids.id);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new LabelController();