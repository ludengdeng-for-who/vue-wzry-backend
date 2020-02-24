const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = Acticle = mongoose.model(
  "acticle",
  new Schema({
    type: {
      type: String
    },
    categories: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category"
      }
    ],
    body: {
      type: String
    }
  },{
    timestamps:true
  })
);
