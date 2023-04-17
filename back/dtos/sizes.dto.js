class SizesDto {
  id;
  name;
  sort;
  published;
  code;
  rosSize;
  waistCircumference;
  hipGirth;
  constructor(model) {
    this.name = model.name;
    this.id = model._id;
    this.rosSize=model.rosSize;
    this.waistCircumference=model.waistCircumference;
    this.hipGirth=model.hipGirth;
    this.code = model.code;
    this.sort = model.sort;
    this.published = model.published;
  }
}

module.exports = SizesDto;