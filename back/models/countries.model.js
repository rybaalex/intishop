const { Schema, model } = require("mongoose");

const CountriesSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  image: { type: String, default: "" }
});

module.exports = model("Countries", CountriesSchema);