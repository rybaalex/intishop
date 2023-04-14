const RoleModel = require("../models/role.model");
const UserModel = require("../models/user.model");
const ApiError = require("../exceptions/api-error");
const SizeModel = require("../models/size.model");
const CodeErrors = require("../exceptions/code_errors");

class RoleService {

  async getRoles() {
    return RoleModel.find();
  }

  async getRolesOne(id) {
    return RoleModel.findOne({ _id: id });
  }

  async putRole(id, value) {
    const rolesAlready = await RoleModel.findOne({ value: value.toUpperCase() });
    if (rolesAlready) {
      throw ApiError.BadRequest(CodeErrors.alreadyExists.title, CodeErrors.alreadyExists.code);
    }
    const roles = await RoleModel.findOne({ _id: id });
    if (!roles) {
      throw ApiError.BadRequest(CodeErrors.noDataFound.title, CodeErrors.noDataFound.code);
    }
    roles.value = value.toUpperCase();
    roles.save();
    return roles;
  }

  async postRole(value) {
    const findRoles = await RoleModel.findOne({ value: value });
    if (findRoles) {
      throw ApiError.BadRequest(CodeErrors.alreadyExists.title, CodeErrors.alreadyExists.code);
    }
    return RoleModel.create({ value: value.toUpperCase() });
  }

  async deleteRoleOne(id) {
    const findRoles = await RoleModel.findOne({ _id: id });
    if (!findRoles) {
      throw ApiError.BadRequest(CodeErrors.noDataFound.title, CodeErrors.noDataFound.code);
    }
    return RoleModel.deleteOne({ _id: id });
  }
  async deleteRoleMany(ids) {
    return RoleModel.deleteMany({ _id: ids });
  }

}

module.exports = new RoleService();