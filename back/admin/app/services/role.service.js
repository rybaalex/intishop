const RoleModel = require("../../../models/role.model");

class RoleService {

  async getRoles() {
    return RoleModel.find();
  }
}

module.exports = new RoleService();