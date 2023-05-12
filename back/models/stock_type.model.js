const { Schema, model } = require("mongoose");

const StockTypeSchema = new Schema({
  title: { type: String, require },
  code: { type: String, require },
  background: {type: String, default: "#e1e1e1"},
  color:{type:String, default: "#ffffff"}

});

module.exports = model("StockTypes", StockTypeSchema);