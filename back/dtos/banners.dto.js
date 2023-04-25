class CategoriesDto {
  id;
  name;
  sort;
  published;
  image;
  url;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.image = model.image;
    this.sort = model.sort;
    this.published = model.published;
    this.url = model.url;
  }
}

module.exports = CategoriesDto;