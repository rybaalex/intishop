const { Schema, model } = require("mongoose");

const bannerSchema = new Schema({
  name: { type: String, required: true, index: true },
  image: {
    mobile: { type: String, default: "" },
    tablet: { type: String, default: "" },
    desktop: { type: String, default: "" }
  },
  sort: { type: Number, default: 10 },
  published: { type: Boolean, default: true },
  url: { type: String }
});

module.exports = model("Banners", bannerSchema);