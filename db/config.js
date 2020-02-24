const mongoose = require("mongoose");
module.exports = server => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/category", {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("mongodb is connected");
    });
    require('require-all')(__dirname + '/../models');
};
