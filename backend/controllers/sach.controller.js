const Sach = require("../models/Sach");
const getNextSequence = require("../utils/autoIncrement");

exports.create = async (req, res) => {
  try {
    const nextSeq = await getNextSequence("sach");
    req.body.MaSach = `S${nextSeq}`;
    req.body.SoLuongTon = req.body.SoQuyen; // tồn kho ban đầu = tổng số quyen

    const sach = new Sach(req.body);
    await sach.save();
    res.status(201).json(sach);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await Sach.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const sach = await Sach.findOne({ MaSach: req.params.MaSach });
    if (!sach) return res.status(404).json({ error: "Không tìm thấy!" });
    res.json(sach);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const sach = await Sach.findOneAndUpdate(
      { MaSach: req.params.MaSach },
      req.body,
      { new: true }
    );
    if (!sach) return res.status(404).json({ error: "Không tìm thấy!" });
    res.json(sach);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const sach = await Sach.findOneAndDelete({ MaSach: req.params.MaSach });
    if (!sach) return res.status(404).json({ error: "Không tìm thấy!" });
    res.json({ message: "Đã xoá!", sach });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
