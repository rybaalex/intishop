const roleService = require("../services/role.service");
const ApiError = require("../../exceptions/api-error");
const responseDto = require("../../dtos/response.dto");
const RolesDto = require("../../dtos/roles.dto");
const CodeErrors = require("../../exceptions/code_errors");

class RolesController {
  async getRoles(req, res, next) {
    try {
      const roles = await roleService.getRoles();
      if (roles.length === 0) {
        return next(ApiError.BadRequest(CodeErrors.noDataFound.title, CodeErrors.noDataFound.code));
      }
      responseDto.response = roles.map(d => new RolesDto(d));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async getRoleOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }
      responseDto.response = new RolesDto(await roleService.getRolesOne(id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async putRole(req, res, next) {
    try {
      const { id, value } = req.body;
      if (!id || !value) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }
      responseDto.response = new RolesDto(await roleService.putRole(id, value));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async postRole(req, res, next) {
    try {
      const { value } = req.body;
      if (!value) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }
      responseDto.response = new RolesDto(await roleService.postRole(value));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteRoleOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }
      responseDto.response = new RolesDto(await roleService.deleteRoleOne(id));
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteRoleMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);
      if (!ids.id) {
        return next(ApiError.BadRequest(CodeErrors.notParams.title, CodeErrors.notParams.code));
      }
      await roleService.deleteRoleMany(ids.id);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new RolesController();