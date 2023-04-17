class UserDto {
  email;
  isActivated;
  id;
  name;
  roles;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.name = model.name;
    this.roles = model.roles;
  }
}

module.exports = UserDto;