const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  logo: {
    img: Buffer,
    contentType: String
  },
  roles: [{ type: String, ref: "Roles" }]
});

module.exports = model("Users", UserSchema);