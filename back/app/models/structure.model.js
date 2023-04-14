const {Schema, model} = require("mongoose");

const StructuresSchema = new Schema({
    sort: {type: Number},
    published: {type: Boolean, default: true},
    name: {type: String, required: true},
    code: {type: String, required: true, unique: true}
});

module.exports = model("Structures", StructuresSchema);