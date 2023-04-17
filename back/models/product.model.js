const { Schema, model } = require("mongoose");

const ProductsSchema = new Schema({
  name: { type: String, require: true },
  alias: { type: String, require: true },
  description: { type: String },
  seo_description: { type: String },
  seo_keyword: { type: String },
  images: {
    img: { type: String },
    title: { type: String, default: "" },
    mimeType: { type: String, default: "" },
    sort: { type: Number, default: 10 }
  },
  brand: { type: Schema.Types.ObjectId, ref: "Brands", require: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "Categories", require: true }],
  sizes: [{ type: Schema.Types.ObjectId, ref: "Size", require: true }],
  structures: [{ type: Schema.Types.ObjectId, ref: "Structures", require: true }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }],
  colors: [{ type: Schema.Types.ObjectId, ref: "Colors" }],
  count: { type: Number, default: 0 },
  price: { type:Number, default:0 }
});

module.exports = model("Products", ProductsSchema);