const tagService = require("../services/tag.service");
const responseDto = require("../../../dtos/response.dto");
const tagsDto = require("../../../dtos/tags.dto");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");

class TagController {

  async getTags(req, res) {
    try {
      const tags = await tagService.getTags(req.query);
      responseDto.response = tags.map(e => {
        return new tagsDto(e);
      });
      responseDto.page = { totalRecords: await tagService.getTotal() };
      return res.json(responseDto);
    } catch (err) {
      console.log("err", err);
    }
  }

  async getTagOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = new tagsDto(await tagService.getTagOne(id));
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
      responseDto.response = new tagsDto(await tagService.published(_id, published));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async postTag(req, res, next) {
    try {
      const body = req.body;

      if (!body.code || !body.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      body.code = body.code.toLowerCase().replaceAll(" ", "_");
      const tag = await tagService.createTag(body);
      responseDto.response = new tagsDto(tag);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async putTag(req, res, next) {
    try {
      const putBody = req.body;
      if (!putBody.code || !putBody.name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      await tagService.editTag(putBody);
      responseDto.response = new tagsDto(await tagService.getTagOne(putBody.id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteTagOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = await tagService.deleteTagOne(id);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteTagMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);
      if (!ids.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      await tagService.deleteTagMany(ids.id);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TagController();