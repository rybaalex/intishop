const { Schema, model } = require("mongoose");

const TagsSchema = new Schema({
  sort: { type: Number, default: 10 },
  published: { type: Boolean, default: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
});

module.exports = model("Tags", TagsSchema);