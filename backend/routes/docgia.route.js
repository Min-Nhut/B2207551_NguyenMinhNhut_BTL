const express = require("express");
const router = express.Router();
const docgiaController = require("../controllers/docgia.controller");

// Tạo mới
router.post("/register", docgiaController.create);

//Cập nhật
router.put("/:MaDocGia", docgiaController.update);

// Đăng nhập
router.post("/login", docgiaController.login);

module.exports = router;
