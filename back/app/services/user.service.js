const UserModel = require("../../models/user.model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail.service");
const tokenService = require("./token.service");
const UserDto = require("../../dtos/user.dto");
const apiError = require("../../exceptions/api-error");
const codeErrors = require("../../exceptions/code_errors");
const fs = require("fs");
const responseDto = require("../../dtos/response.dto");
const BrandModel = require("../../models/brand.model");

class UserService {
  async signUp(email, password, name) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw apiError.BadRequest("Емайл " + email + " " + codeErrors.alreadyExists.title, codeErrors.alreadyExists.code);
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const activationLink = uuid.v4();
    //  const userRole = await Role.findOne({value:'USER'})
    const user = await UserModel.create({ email, password: hashPassword, activationLink, name, roles: ["USER"] });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    await mailService.sendActivationMail(email, `${process.env.APP_URL}:${process.env.SERVER_PORT}/api/v1/activate/${activationLink}`).catch(err => console.log("222", err));
    return {
      ...tokens,
      user: userDto
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw apiError.BadRequest(codeErrors.notActivatedLink.title, codeErrors.notActivatedLink.code);
    }
    user.isActivated = true;
    await user.save();
  }

  async signIn(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw apiError.BadRequest("Не верный логин или пароль", 401);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw apiError.BadRequest("Не верный логин или пароль", 401);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto, accessTokenLife: process.env.ACCESS_TOKKEN_LIFE };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      return { identity: false, data: [] };
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw apiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateAccessToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto, accessTokenLife: process.env.ACCESS_TOKKEN_LIFE };
  }

  async forgot(email) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw apiError.BadRequest(codeErrors.userNotFound.title, codeErrors.userNotFound.code);
    }
    const userDto = new UserDto(user);
    await mailService.sendForgotMail(email, `${process.env.APP_URL}:${process.env.CLIENT_PORT}/auth/reset_password/${user._id}/${user.email}`).catch(err => console.log("222", err));
    return { userDto };
  }


  async editPassword(id, password) {
    const findUser = await UserModel.findOne({ _id: id });
    if (!findUser) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    const hashPassword = await bcrypt.hash(password, 7);

    return UserModel.updateOne({ _id: id }, {
      $set: {
        password: hashPassword
      }
    });
  }

  async getMe(token) {
    return tokenService.validateAccessToken(token.split(" ")[1]);
  }

}

module.exports = new UserService();