class ColorsDto {
  id;
  name;
  code_background;
  code_color;

  constructor(model) {
    this.name = model.name;
    this.id = model._id;
    this.code_background = model.code_background;
    this.code_color = model.code_color;
  }
}

module.exports = ColorsDto;