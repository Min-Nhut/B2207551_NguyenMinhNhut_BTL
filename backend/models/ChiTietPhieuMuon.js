// models/ChiTietPhieuMuon.js
const mongoose = require("mongoose");

const ChiTietPhieuMuonSchema = new mongoose.Schema({
  MaPhieu: { type: String, required: true },
  MaSach: { type: String, required: true },
  SoLuongMuon: { type: Number, default: 1, min: 1 },
});

module.exports = mongoose.model("ChiTietPhieuMuon", ChiTietPhieuMuonSchema);
