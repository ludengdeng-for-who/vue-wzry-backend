const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

module.exports = admin = mongoose.model(
  "admin",
  new Schema({
    userName: {
      type: String
    },
    password: {
      select: false,
      type: String,
      set(val) {
        return bcrypt.hashSync(val, 10);
      }
    }
  })
);
