class StructuresDto {
  id;
  name;
  sort;
  published;
  code;
  constructor(model) {
    this.name = model.name;
    this.id = model._id;
    this.code = model.code;
    this.sort = model.sort;
    this.published = model.published;
  }
}

module.exports = StructuresDto;