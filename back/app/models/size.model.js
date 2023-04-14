const {Schema, model} = require("mongoose");

const SizesSchema = new Schema({
    sort: {type: Number},
    published: {type: Boolean, default: true},
    name: {type: String, required: true},
    rosSize: {type: Number, required: true},
    waistCircumference: {type: String},
    hipGirth: {type: String},
    code: {type: String, required: true, unique: true}
});

module.exports = model("Sizes", SizesSchema);