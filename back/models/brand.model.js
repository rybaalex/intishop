const { Schema, model } = require("mongoose");

const brandSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, default: "" },
  alias: { type: String, index: true },
  description: { type: String, default: "" },
  sort: { type: Number, default: 10 },
  published: { type: Boolean, default: true },
  countryId:{type: Schema.Types.ObjectId, ref: "Countries", require: true}
});

module.exports = model("Brands", brandSchema);