const express = require("express");
const router = express.Router();
const sachController = require("../controllers/sach.controller");

// Public GET
router.get("/", sachController.getAll);

module.exports = router;
