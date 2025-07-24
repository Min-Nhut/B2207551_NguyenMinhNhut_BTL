const mongoose = require("mongoose");

const NhanVienSchema = new mongoose.Schema({
  MSNV: { type: String, required: true, unique: true },
  HoTenNV: String,
  MatKhau: String,
  Chucvu: String,
  DiaChi: String,
  SoDienThoai: String,
  Role: {
    type: String,
    enum: ["admin", "staff"],
    default: "staff",
  },
});

module.exports = mongoose.model("NhanVien", NhanVienSchema);
