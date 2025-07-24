// app.js
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.json({ message: "Chào mừng đến với Hệ Thống Quản Lý Mượn Sách!" });
});

// Import routes
const docgiaRouter = require("./routes/docgia.route");
const sachRouter = require("./routes/sach.route");
const phieumuonRouter = require("./routes/phieumuon.route");
const nhanvienRouter = require("./routes/nhanvien.route");
const adminRouter = require("./routes/admin.route");

// Dùng routes
app.use("/api/docgia", docgiaRouter);
app.use("/api/sach", sachRouter);
app.use("/api/phieumuon", phieumuonRouter);
app.use("/api/nhanvien", nhanvienRouter);
app.use("/api/admin", adminRouter);

// ...

// Xử lý 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Resource not found" });
});

// Xử lý lỗi tập trung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
