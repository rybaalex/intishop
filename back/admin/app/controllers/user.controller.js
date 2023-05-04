const userService = require("../services/user.service");
const ApiError = require("../../../exceptions/api-error");
const UserDto = require("../../../dtos/user.dto");
const responseDto = require("../../../dtos/response.dto");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");
const tagService = require("../services/tag.service");

class UserController {
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
  async deleteUserOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      responseDto.response = await userService.deleteUserOne(id);
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async deleteUserMany(req, res, next) {
    try {
      const ids = JSON.parse(req.query.filter);
      if (!ids.id) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      await userService.deleteUserMany(ids.id);
      responseDto.response = [{ id: "", value: "" }];
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();