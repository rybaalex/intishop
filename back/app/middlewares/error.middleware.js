const ApiError = require("../exceptions/api-error");
module.exports = function(err, req, res, next) {
  if (err instanceof ApiError) {
   return next(res.status(err.status).json({ hasError: true, message: err.message, response: [], status: err.status }));
  }
  return res.status(500).json({ message: "Ошибка сервера", err });
};