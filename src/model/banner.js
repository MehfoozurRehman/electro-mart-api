const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  images: Array,
});

module.exports = mongoose.model("Banner", schema);
