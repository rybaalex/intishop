const userService = require("../services/user.service");
const ApiError = require("../../../exceptions/api-error");
const UserDto = require("../../../dtos/user.dto");
const responseDto = require("../../../dtos/response.dto");

class UserController {
  async signUp(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", 445));
      }

      const { email, password, name } = req.body;
      const userData = await userService.signUp(email, password, name);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password, forgot } = req.body;
      const maxAge = forgot ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
      const userData = await userService.signIn(email, password);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: maxAge, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.APP_URL + ":" + process.env.CLIENT_PORT);

    } catch (e) {
      next(e);
    }
  }

  async isActivated(req, res, next) {
    try {
      const { _id, isActivated } = req.body;
      const user = await userService.isActivated(_id, isActivated);
      responseDto.response = new UserDto(user);
      return res.json(responseDto);

    } catch (e) {
      next(e);
    }
  }

  async refresh_token(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getMe(req, res, next) {
    try {
      const users = await userService.getMe(req.headers.authorization);
      const userDto = new UserDto(users);
      return res.json(userDto);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      responseDto.response = users.map(model => {
        return {
          email: model.email,
          id: model._id,
          isActivated: model.isActivated,
          name: model.name,
          roles: model.roles
        };
      });
      return res.json(responseDto);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();