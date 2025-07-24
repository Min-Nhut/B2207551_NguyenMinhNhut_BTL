const PhieuMuon = require("../models/PhieuMuon");
const ChiTietPhieuMuon = require("../models/ChiTietPhieuMuon");
const DocGia = require("../models/DocGia");
const Sach = require("../models/Sach");
const getNextSequence = require("../utils/autoIncrement");

// TẠO PHIẾU MƯỢN + CHI TIẾT GỘP
exports.createWithDetails = async (req, res) => {
  const session = await PhieuMuon.startSession();
  session.startTransaction();
  try {
    const { MaDocGia, NgayMuon, NgayTra, ChiTiet } = req.body;

    const dg = await DocGia.findOne({ MaDocGia });
    if (!dg) throw new Error("Độc giả không tồn tại!");

    const nextMa = await getNextSequence("phieumuon");
    const MaPhieu = `PM${nextMa}`;

    await PhieuMuon.create(
      [{ MaPhieu, MaDocGia, NgayMuon, NgayTra, TinhTrang: "ChuaTra" }],
      { session }
    );

    for (const item of ChiTiet) {
      const sach = await Sach.findOne({ MaSach: item.MaSach });
      if (!sach) throw new Error(`Sách ${item.MaSach} không tồn tại`);
      if (sach.SoLuongTon < item.SoLuongMuon) {
        throw new Error(`Sách ${item.MaSach} không đủ tồn kho`);
      }
      sach.SoLuongTon -= item.SoLuongMuon;
      await sach.save({ session });

      await ChiTietPhieuMuon.create(
        [{ MaPhieu, MaSach: item.MaSach, SoLuongMuon: item.SoLuongMuon }],
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ MaPhieu, message: "Tạo Phiếu Mượn thành công!" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};

// LẤY 1 PHIẾU + CHI TIẾT
exports.getOne = async (req, res) => {
  const MaPhieu = req.params.MaPhieu;
  const phieu = await PhieuMuon.findOne({ MaPhieu });
  if (!phieu) return res.status(404).json({ error: "Không tìm thấy Phiếu" });

  const chiTiet = await ChiTietPhieuMuon.find({ MaPhieu });

  res.json({ phieu, chiTiet });
};

// LẤY TẤT CẢ PHIẾU 1 ĐỘC GIẢ
exports.getByDocGia = async (req, res) => {
  const MaDocGia = req.params.MaDocGia;
  const phieuList = await PhieuMuon.find({ MaDocGia });
  if (phieuList.length === 0) {
    return res
      .status(404)
      .json({ error: "Không tìm thấy Phiếu nào cho Độc Giả này" });
  }

  const result = [];
  for (const phieu of phieuList) {
    const chiTiet = await ChiTietPhieuMuon.find({ MaPhieu: phieu.MaPhieu });
    result.push({ phieu, chiTiet });
  }

  res.json(result);
};

// GIA HẠN
exports.extendPhieuMuon = async (req, res) => {
  try {
    const MaPhieu = req.params.MaPhieu;
    const { NgayTraMoi } = req.body;

    const phieu = await PhieuMuon.findOne({ MaPhieu });
    if (!phieu) return res.status(404).json({ error: "Không tìm thấy Phiếu" });

    const ngayTraMoiDate = new Date(NgayTraMoi);
    if (ngayTraMoiDate <= phieu.NgayTra) {
      return res
        .status(400)
        .json({ error: "Ngày trả mới phải lớn hơn ngày trả hiện tại!" });
    }

    phieu.NgayTra = ngayTraMoiDate;
    await phieu.save();

    res.json({ message: `Gia hạn thành công!`, phieu });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// XOÁ PHIẾU + HOÀN TRẢ TỒN KHO
exports.deletePhieuMuon = async (req, res) => {
  const session = await PhieuMuon.startSession();
  session.startTransaction();
  try {
    const MaPhieu = req.params.MaPhieu;
    const phieu = await PhieuMuon.findOne({ MaPhieu });
    if (!phieu) throw new Error("Không tìm thấy Phiếu!");

    const chiTietList = await ChiTietPhieuMuon.find({ MaPhieu });

    for (const ct of chiTietList) {
      const sach = await Sach.findOne({ MaSach: ct.MaSach });
      if (sach) {
        sach.SoLuongTon += ct.SoLuongMuon;
        await sach.save({ session });
      }
    }

    await ChiTietPhieuMuon.deleteMany({ MaPhieu }, { session });
    await PhieuMuon.deleteOne({ MaPhieu }, { session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: `Đã xoá Phiếu ${MaPhieu} + trả tồn kho!` });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};

// TRẢ PHIẾU MƯỢN
exports.traPhieuMuon = async (req, res) => {
  const session = await PhieuMuon.startSession();
  session.startTransaction();

  try {
    const MaPhieu = req.params.MaPhieu;

    const phieu = await PhieuMuon.findOne({ MaPhieu });
    if (!phieu) throw new Error("Không tìm thấy Phiếu!");

    if (phieu.TinhTrang === "DaTra") {
      throw new Error("Phiếu này đã được trả trước đó!");
    }

    const chiTietList = await ChiTietPhieuMuon.find({ MaPhieu });

    for (const ct of chiTietList) {
      const sach = await Sach.findOne({ MaSach: ct.MaSach });
      if (sach) {
        sach.SoLuongTon += ct.SoLuongMuon;
        await sach.save({ session });
      }
    }

    phieu.TinhTrang = "DaTra";
    await phieu.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: `Đã trả Phiếu ${MaPhieu} thành công + hoàn kho!` });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};
