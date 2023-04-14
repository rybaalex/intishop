const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users" }
});

module.exports = model("Cart", CartSchema);