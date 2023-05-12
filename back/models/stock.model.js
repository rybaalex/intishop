const { Schema, model } = require("mongoose");

const StockSchema = new Schema({
  description: { type: String },
  type: { type: Schema.Types.ObjectId, ref: "StockTypes" },
  image: {
    mobile: { type: String, default: "" },
    tablet: { type: String, default: "" },
    desktop: { type: String, default: "" }
  },
  sort: { type: Number, default: 10 },
  published: { type: Boolean, default: true },
  url: { type: String, default: "" }
});

module.exports = model("Stocks", StockSchema);