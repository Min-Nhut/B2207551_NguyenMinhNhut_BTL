const NhaXuatBan = require("../models/NhaXuatBan");
const getNextSequence = require("../utils/autoIncrement");

exports.create = async (req, res) => {
  try {
    const nextSeq = await getNextSequence("nxb");
    req.body.MaNXB = `NXB${nextSeq}`;
    const nxb = new NhaXuatBan(req.body);
    await nxb.save();
    res.status(201).json(nxb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await NhaXuatBan.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const nxb = await NhaXuatBan.findOne({ MaNXB: req.params.MaNXB });
    if (!nxb) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(nxb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await NhaXuatBan.findOneAndUpdate(
      { MaNXB: req.params.MaNXB },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await NhaXuatBan.findOneAndDelete({
      MaNXB: req.params.MaNXB,
    });
    if (!deleted) return res.status(404).json({ error: "Không tìm thấy" });
    res.json({ message: "Đã xóa", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
