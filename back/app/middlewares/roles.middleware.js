const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api-error");

module.exports = function(roles) {
  return function(req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) next(ApiError.UnauthorizedError());

      const { roles: userRoles } = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      let hasRole = false;
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) next(ApiError.BadRequest("У вас нет доступа"))
      next();
    } catch (e) {
      throw ApiError.UnauthorizedError();
    }
  };
};