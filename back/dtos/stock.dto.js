class StockTypeDto {
  id;
  description;
  type;
  image;
  url;
  sort;
  published;

  constructor(model) {
    this.description = model.description;
    this.type = model.type;
    this.image = model.image;
    this.url = model.url;
    this.sort = model.sort;
    this.published = model.published;
    this.id = model._id;
  }
}

module.exports = StockTypeDto;