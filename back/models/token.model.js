const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  refreshToken: { type: String, require: true }
});

module.exports = model("Tokens", TokenSchema);