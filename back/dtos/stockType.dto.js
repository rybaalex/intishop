class StockTypeDto {
  id;
  code;
  title;
  background;
  color;
  constructor(model) {
    this.code = model.code;
    this.title=model.title;
    this.background=model.background;
    this.color=model.color;
    this.id = model._id;
  }
}

module.exports = StockTypeDto;