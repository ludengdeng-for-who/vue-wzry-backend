
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = Item = mongoose.model(
  "item",
  new Schema({
    type: {
      type: String
    },
    icon: {
      type: String
    }
  })
);