const { Schema, model } = require("mongoose");

const ProductsSchema = new Schema({
  name: { type: String, require: true },
  alias: { type: String, require: true },
  article: { type: String, require: true },
  description: { type: String },
  seo_description: { type: String },
  seo_keyword: { type: String },
  images: [{
    mobile: { type: String, default: "" },
    tablet: { type: String, default: "" },
    desktop: { type: String, default: "" },
    catalog: { type: String, default: "" },
  }],
  image_catalog: {type: String},
  brands: { type: Schema.Types.ObjectId, ref: "Brands", require: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "Categories", require: true }],
  sizes: [{ type: Schema.Types.ObjectId, ref: "Sizes", require: true }],
  structures: [{ type: Schema.Types.ObjectId, ref: "Structures", require: true }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tags", require: true }],
  colors: [{ type: Schema.Types.ObjectId, ref: "Colors", require: true }],
  stocks: [{ type: Schema.Types.ObjectId, ref: "StockTypes" }],
  count: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  sale: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  published: { type: Boolean, default: true }
});

module.exports = model("Products", ProductsSchema);