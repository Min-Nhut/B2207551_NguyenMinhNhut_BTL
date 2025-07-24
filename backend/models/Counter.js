const mongoose = require("mongoose");

const counterShema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});

module.exports = mongoose.model("Counter", counterShema);
