class CategoriesDto {
  id;
  name;
  description;
  sort;
  published;
  logo;
  image_menu_background;
  alias;
  parent_id;

  constructor(model) {
    this.alias = model.alias;
    this.name = model.name;
    this.id = model._id;
    this.logo = model.logo;
    this.image_menu_background = model.image_menu_background;
    this.description = model.description;
    this.sort = model.sort;
    this.published = model.published;
    this.parent_id = model.parent_id;
  }
}

module.exports = CategoriesDto;