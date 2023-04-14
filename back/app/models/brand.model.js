const { Schema, model } = require("mongoose");

const brandSchema = new Schema({
  name: { type: String, required: true },
  logo: {
    img: { type: String },
    title: { type: String, default: "" },
    mimeType: { type: String, default: "" }
  },
  alias: { type: String, index: true },
  description: { type: String, default: "" },
  sort: { type: Number, default: 10 },
  published: { type: Boolean, default: true }
});

module.exports = model("Brands", brandSchema);