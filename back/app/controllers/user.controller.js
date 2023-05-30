const userService = require("../services/user.service");
const apiError = require("../../exceptions/api-error");
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

  async refresh_token(req, res, next) {
    try {
      const { refresh_token } = req.cookies;
      const userData = await userService.refresh(refresh_token);
      return res.json(userData);
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

  async getMe(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(apiError.BadRequest(codeErrors.notParams.title, codeErrors.notParams.code));
    }
    responseDto.response = await userService.getMe(authorization);
    return res.json(responseDto);
  }

}

module.exports = new UserController();