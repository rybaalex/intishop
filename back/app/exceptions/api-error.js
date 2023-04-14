module.exports = class ApiError extends Error {
  status;

  constructor(status, message, errors) {
    super(message);
    this.status = status;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static BadRequest(message, status = 400) {
    return new ApiError(status, message);
  }
};