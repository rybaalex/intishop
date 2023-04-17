const { Schema, model } = require("mongoose");

const StaticPageSchema = new Schema({
  title: { type: String, required: true },
  sort: { type: Number },
  published: { type: Boolean, default: true },
  url: { type: String, required: true },
  isHeader: { type: Boolean, required: true, default: true }
});

module.exports = model("StaticPages", StaticPageSchema);