class StaticPageDto {
  id;
  title;
  sort;
  published;
  url;
  isHeader;

  constructor(model) {
    this.title = model.title;
    this.id = model._id;
    this.sort = model.sort;
    this.published = model.published;
    this.url = model.url;
    this.isHeader = model.isHeader;
  }
}

module.exports = StaticPageDto;