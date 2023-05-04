const userService = require("../services/user.service");
const apiError = require("../../exceptions/api-error");
const UserDto = require("../../dtos/user.dto");
const responseDto = require("../../dtos/response.dto");
const codeErrors = require("../../exceptions/code_errors");
const ObjectID = require("mongodb").ObjectID;

class UserController {
  async signUp(req, res, next) {
    try {
      const { email, password, name } = req.body;
      if (!email || !password | !name) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
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
      res.cookie("refresh_token", userData.refreshToken, { maxAge: maxAge, httpOnly: true });
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
      await userService.activate(activationLink).then(() => {
        return res.redirect(process.env.APP_URL + ":" + process.env.CLIENT_PORT + "/auth/success");
      }).catch(err => {
        return res.redirect(process.env.APP_URL + ":" + process.env.CLIENT_PORT + "/auth/error?message=" + err.message);
      });

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

  async getUsersOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id || !ObjectID.isValid(id)) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }

      const user = await userService.getUserOne(id);
      responseDto.response = user ? new UserDto(user) : null;
      return res.json(responseDto);
    } catch (e) {
      next(e);
    }
  }

  async forgot(req, res, next) {
    try {
      const { email } = req.params;
      if (!email) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      const resultUser = await userService.forgot(email);
      responseDto.response = ["OK"];
      return res.json(responseDto);
    } catch (err) {
      next(err);
    }
  }

  async reset(req, res, next) {
    try {
      const { id, password } = req.body;
      if (!id || !password) {
        return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
      }
      const resultUser = await userService.editPassword(id, password);
      responseDto.response = ["OK"];
      return res.json(responseDto);
    } catch (err) {
      next(err);
    }
  }

}

module.exports = new UserController();