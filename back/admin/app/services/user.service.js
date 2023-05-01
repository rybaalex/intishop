const UserModel = require("../../../models/user.model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail.service");
const tokenService = require("./token.service");
const UserDto = require("../../../dtos/user.dto");
const ApiError = require("../../../exceptions/api-error");
const CodeErrors = require("../../../exceptions/code_errors");
const tagModel = require("../../../models/tags.model");
const apiError = require("../../../exceptions/api-error");
const codeErrors = require("../../../exceptions/code_errors");


class UserService {
  async signUp(email, password, name) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const activationLink = uuid.v4();
    //  const userRole = await Role.findOne({value:'USER'})
    const user = await UserModel.create({ email, password: hashPassword, activationLink, name, roles: ["USER"] });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    //const mail = await mailService.sendActivationMail(email, `${process.env.APP_URL}/api/v1/activate/${activationLink}`);
    //console.log("mail", mail);
    return {
      ...tokens,
      user: userDto
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Не корректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }

  //активация для админки
  async isActivated(id, isActivated) {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw ApiError.BadRequest(CodeErrors.noDataFound.title, CodeErrors.noDataFound.code);
    }
    user.isActivated = isActivated;
    await user.save();
    return user;
  }

  async signIn(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден, зарегистрируйтесь", 444);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Вы ввели не верный пароль", 401);
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
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto, accessTokenLife: process.env.ACCESS_TOKKEN_LIFE };
  }

  async getMe(accessToken) {
    const accessTokenSplit = accessToken.split(" ")[1];
    const userData = tokenService.validateAccessToken(accessTokenSplit);
    return UserModel.findOne({ _id: userData.id });
  }

  async getUsers() {
    return UserModel.find();
  }
  async deleteUserOne(_id) {
    const findUser = await UserModel.findOne({ _id });
    if (!findUser) {
      throw apiError.BadRequest(codeErrors.noDataFound.title, codeErrors.noDataFound.code);
    }
    return UserModel.deleteOne({ _id });
  }

  async deleteUserMany(ids) {
    return UserModel.deleteMany({ _id: ids });
  }
}

module.exports = new UserService();