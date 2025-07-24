const mongoose = require("mongoose");

const PhieuMuonSchema = new mongoose.Schema({
  MaPhieu: { type: String, unique: true },
  MaDocGia: { type: String, required: true },
  NgayMuon: { type: Date, required: true },
  NgayTra: { type: Date, required: true },
  TinhTrang: { type: String, enum: ["ChuaTra", "DaTra"], default: "ChuaTra" },
});

module.exports = mongoose.model("PhieuMuon", PhieuMuonSchema);
