const mongoose = require("mongoose");

const NhaXuatBanSchema = new mongoose.Schema({
  MaNXB: { type: String, required: true, unique: true },
  TenNXB: String,
  DiaChi: String,
});

module.exports = mongoose.model("NhaXuatban", NhaXuatBanSchema);
