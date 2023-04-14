const { Schema, model } = require("mongoose");

const LabelsSchema = new Schema({
  name: { type: String, required: true },
  code_background: { type: String, required: true },
  code_color: { type: String, required: true },
});

module.exports = model("Labels", LabelsSchema);