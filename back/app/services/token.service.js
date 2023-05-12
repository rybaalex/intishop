const jwt = require("jsonwebtoken");
const tokenModel = require("../../models/token.model");

class TokenService {
  generateToken(payload, type = "login") {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKKEN_LIFE + "m" });
    const refreshToken = type === "login" ? jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_FORGOT }) : jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN });

    return {
      accessToken,
      refreshToken
    };
  }

  generateAccessToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKKEN_LIFE + "m" });

    return {
      accessToken
    };
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await tokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken) {
    return tokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken) {
    return tokenModel.find({ refreshToken: refreshToken });
  }
}

module.exports = new TokenService();