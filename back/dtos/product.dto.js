class ProductDto {
  id;
  name;
  alias;
  description;
  seo_description;
  seo_keyword;
  images;
  image_catalog;
  categories;
  sizes;
  structures;
  tags;
  colors;
  stocks;
  count;
  price;
  sale;
  published;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.alias = model.alias;
    this.description = model.description;
    this.seo_description = model.seo_description;
    this.seo_keyword = model.seo_keyword;
    this.images = model.images;
    this.brands = model.brands;
    this.categories = model.categories;
    this.sizes = model.sizes;
    this.structures = model.structures;
    this.tags = model.tags;
    this.colors = model.colors;
    this.stocks = model.stocks;
    this.count = model.count;
    this.price = model.price;
    this.sale = model.sale;
    this.published = model.published;

  }
}

module.exports = ProductDto;