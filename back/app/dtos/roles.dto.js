class RolesDto {
  id;
  value;

  constructor(model) {
    this.id = model._id;
    this.value = model.value;
  }
}

module.exports = RolesDto;