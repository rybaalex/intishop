class CountryDto {
  id;
  name;
  code;
  image;

  constructor(model) {
    this.name = model.name;
    this.code = model.code;
    this.id = model._id;
    this.image = model.image;
  }
}

module.exports = CountryDto;