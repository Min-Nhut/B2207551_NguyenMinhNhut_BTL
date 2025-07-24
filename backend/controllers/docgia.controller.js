const DocGia = require("../models/DocGia");
const bcrypt = require("bcrypt");
const getNextSequence = require("../utils/autoIncrement");
const hideFields = require("../utils/hideFields");

// Đăng ký (create)
exports.create = async (req, res) => {
  try {
    // Kiểm tra Email đã tồn tại chưa?
    const exist = await DocGia.findOne({ TaiKhoan: req.body.TaiKhoan });
    if (exist) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại!" });
    }

    const nextSeq = await getNextSequence("docgia");
    req.body.MaDocGia = `DG${nextSeq}`;

    // Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    req.body.MatKhau = await bcrypt.hash(req.body.MatKhau, salt);

    const docGia = new DocGia(req.body);
    await docGia.save();

    const safe = hideFields(docGia, ["MatKhau"]);
    res.status(201).json({ message: "Tạo độc giả thành công!", docGia: safe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { TaiKhoan, MatKhau } = req.body;
    const docGia = await DocGia.findOne({ TaiKhoan });

    if (!docGia) {
      return res.status(404).json({ error: "Sai tài khoản!" });
    }

    const match = await bcrypt.compare(MatKhau, docGia.MatKhau);
    if (!match) {
      return res.status(401).json({ error: "Sai mật khẩu!" });
    }

    const safe = hideFields(docGia, ["MatKhau"]);
    res.json({ message: "Đăng nhập thành công!", docGia: safe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy danh sách tất cả (admin)
exports.getAll = async (req, res) => {
  try {
    const data = await DocGia.find();
    const safeList = data.map((dg) => hideFields(dg, ["MatKhau"]));
    res.json(safeList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const dg = await DocGia.findOne({ MaDocGia: req.params.MaDocGia });
    if (!dg) return res.status(404).json({ error: "Không tìm thấy Độc Giả" });

    const safe = hideFields(dg, ["MatKhau"]);
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    // Nếu có mật khẩu mới thì hash lại
    if (req.body.MatKhau) {
      const salt = await bcrypt.genSalt(10);
      req.body.MatKhau = await bcrypt.hash(req.body.MatKhau, salt);
    }

    const updated = await DocGia.findOneAndUpdate(
      { MaDocGia: req.params.MaDocGia },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: "Không tìm thấy Độc Giả" });

    const safe = hideFields(updated, ["MatKhau"]);
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const deleted = await DocGia.findOneAndDelete({
      MaDocGia: req.params.MaDocGia,
    });
    if (!deleted)
      return res.status(404).json({ error: "Không tìm thấy Độc Giả" });

    const safe = hideFields(deleted, ["MatKhau"]);
    res.json({ message: "Đã xóa", docGia: safe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
