const express = require("express");
const router = express.Router();
const sachController = require("../controllers/sach.controller");
const nhanvienController = require("../controllers/nhanvien.controller");
const nxbController = require("../controllers/nxb.controller");
const docgiaController = require("../controllers/docgia.controller");
const { checkAdmin } = require("../middlewares/auth");

// 📚 CRUD Sách
router.post("/sach", checkAdmin, sachController.create);
router.put("/sach/:MaSach", checkAdmin, sachController.update);
router.delete("/sach/:MaSach", checkAdmin, sachController.delete);

// 👤 CRUD Nhân viên
router.post("/nhanvien", checkAdmin, nhanvienController.create);
router.get("/nhanvien", checkAdmin, nhanvienController.getAll);
router.get("/nhanvien/:MSNV", checkAdmin, nhanvienController.getById);
router.put("/nhanvien/:MSNV", checkAdmin, nhanvienController.update);
router.delete("/nhanvien/:MSNV", checkAdmin, nhanvienController.delete);

// 🏢 CRUD NXB
router.post("/nxb", checkAdmin, nxbController.create);
router.get("/nxb", checkAdmin, nxbController.getAll);
router.get("/nxb/:MaNXB", checkAdmin, nxbController.getById);
router.put("/nxb/:MaNXB", checkAdmin, nxbController.update);
router.delete("/nxb/:MaNXB", checkAdmin, nxbController.delete);

// CRUD Độc giả
router.get("/docgia", checkAdmin, docgiaController.getAll);
router.get("/docgia/:MaDocGia", checkAdmin, docgiaController.getById);
router.put("/docgia/:MaDocGia", checkAdmin, docgiaController.update);
router.delete("/docgia/:MaDocGia", checkAdmin, docgiaController.delete);

module.exports = router;
