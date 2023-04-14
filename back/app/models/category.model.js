const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: { type: String, required: true, index: true },
  logo: {
    img: { type: String },
    title: { type: String, default: "" },
    mimeType: { type: String, default: "" }
  },
  image_menu_background: {
    img: { type: String },
    title: { type: String, default: "" },
    mimeType: { type: String, default: "" }
  },
  alias: { type: String, index: true },
  description: { type: String, default: "" },
  sort: { type: Number, default: 10 },
  published: { type: Boolean, default: true },
  parent_id: { type: Schema.Types.ObjectId, ref:"Categories" }
});

module.exports = model("Categories", categorySchema);