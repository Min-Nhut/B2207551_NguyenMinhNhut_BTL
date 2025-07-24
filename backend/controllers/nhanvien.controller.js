const NhanVien = require("../models/NhanVien");
const getNextSequence = require("../utils/autoIncrement");
const bcrypt = require("bcrypt");
const hideFields = require("../utils/hideFields");

// Đăng ký nhân viên (admin thêm)
exports.create = async (req, res) => {
  try {
    // Tăng số tự động
    const nextSeq = await getNextSequence("nhanvien");
    req.body.MSNV = `NV${nextSeq}`;

    // Hash mật khẩu
    req.body.MatKhau = await bcrypt.hash(req.body.MatKhau, 10);

    const nv = new NhanVien(req.body);
    await nv.save();

    res.status(201).json(hideFields(nv, ["MatKhau"]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { MSNV, MatKhau } = req.body;

    const nv = await NhanVien.findOne({ MSNV });
    if (!nv) return res.status(401).json({ message: "Sai tài khoản!" });

    const isMatch = await bcrypt.compare(MatKhau, nv.MatKhau);
    if (!isMatch) return res.status(401).json({ message: "Sai mật khẩu!" });

    res.json({
      message: "Đăng nhập thành công!",
      nv: hideFields(nv, ["MatKhau"]),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy toàn bộ nhân viên
exports.getAll = async (req, res) => {
  try {
    const list = await NhanVien.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy theo MSNV
exports.getById = async (req, res) => {
  try {
    const nv = await NhanVien.findOne({ MSNV: req.params.MSNV });
    if (!nv) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(nv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật
exports.update = async (req, res) => {
  try {
    if (req.body.MatKhau) {
      req.body.MatKhau = await bcrypt.hash(req.body.MatKhau, 10);
    }

    const nv = await NhanVien.findOneAndUpdate(
      { MSNV: req.params.MSNV },
      req.body,
      { new: true }
    );

    if (!nv) return res.status(404).json({ error: "Không tìm thấy nhân viên" });

    res.json(hideFields(nv));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa
exports.delete = async (req, res) => {
  try {
    const deleted = await NhanVien.findOneAndDelete({
      MSNV: req.params.MSNV,
    });
    if (!deleted) return res.status(404).json({ error: "Không tìm thấy" });
    res.json({ message: "Đã xóa", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Đăng nhập nhân viên
exports.login = async (req, res) => {
  try {
    const nv = await NhanVien.findOne({ MSNV: req.body.MSNV });
    if (!nv || nv.Password !== req.body.Password) {
      return res.status(401).json({ error: "Sai thông tin đăng nhập!" });
    }

    // Sau khi login ➜ gán Role trả về
    res.json({
      message: "Đăng nhập thành công",
      MSNV: nv.MSNV,
      HoTen: nv.HoTen,
      Role: nv.Role, // 👈
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
