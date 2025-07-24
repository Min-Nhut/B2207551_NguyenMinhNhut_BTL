const express = require("express");
const router = express.Router();
const nhanvienController = require("../controllers/nhanvien.controller");

router.post("/login", nhanvienController.login);

module.exports = router;
