const express = require("express");
const router = express.Router();
const controller = require("../controllers/phieumuon.controller");

router.post("/create-with-details", controller.createWithDetails);
router.get("/:MaPhieu", controller.getOne);
router.get("/docgia/:MaDocGia", controller.getByDocGia);
router.put("/:MaPhieu/extend", controller.extendPhieuMuon);
router.delete("/:MaPhieu", controller.deletePhieuMuon);
router.put("/:MaPhieu/tra", controller.traPhieuMuon);

module.exports = router;
