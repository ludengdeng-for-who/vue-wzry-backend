const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = Ad = mongoose.model(
  "ad",
  new Schema({
    type: {
      type: String
    },
    items: [
      {
        image: { type: String },
        url: { type: String }
      }
    ]
  })
);
