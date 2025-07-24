// Import mongoose
const mongoose = require("mongoose");

// Tạo lượt đồ Schema
const DocGiaSchema = new mongoose.Schema({
  MaDocGia: { type: String, required: true, unique: true }, //VD: DG1, DG2
  HoLot: String,
  Ten: String,
  NgaySinh: Date,
  Phai: { type: String, enum: ["Nam", "Nữ", "Khác"] },
  DiaChi: String,
  DienThoai: String,
  TaiKhoan: { type: String, required: true, unique: true },
  MatKhau: { type: String, required: true },
});

//Export model
module.exports = mongoose.model("DocGia", DocGiaSchema);
