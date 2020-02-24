
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = Category = mongoose.model(
  "category",
  new Schema({
    type: {
      type: String
    },
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "category"
    }
  })
);
