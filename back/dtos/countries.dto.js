class RolesDto {
  id;
  name;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
  }
}

module.exports = RolesDto;