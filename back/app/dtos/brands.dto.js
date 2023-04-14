class BrandsDto {
  id;
  name;
  description;
  sort;
  published;
  logo;
  alias;

  constructor(model) {
    this.name = model.name;
    this.id = model._id;
    this.alias = model.alias;
    this.logo = model.logo;
    this.description = model.description;
    this.sort = model.sort;
    this.published = model.published;
  }
}

module.exports = BrandsDto;