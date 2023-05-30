class BrandsDto {
  id;
  name;
  description;
  sort;
  published;
  image;
  alias;
  countryId;

  constructor(model) {
    this.name = model.name;
    this.id = model._id;
    this.alias = model.alias;
    this.image = model.image;
    this.description = model.description;
    this.sort = model.sort;
    this.published = model.published;
    this.countryId = model.countryId;
  }
}

module.exports = BrandsDto;