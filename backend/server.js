// server.js
const mongoose = require("mongoose");
const app = require("./app");

// Kết nối MongoDB
const MONGODB_URI = "mongodb://127.0.0.1:27017/QuanLyMuonSach";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Đã kết nối MongoDB thành công!"))
  .catch((err) => {
    console.error("Lỗi kết nối MongoDB:", err);
    process.exit();
  });

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
