/*
 * Middleware kiểm tra quyền Admin
 * Demo: bạn sẽ truyền role qua header hoặc token
 * Ở dự án thực tế bạn nên dùng JWT để lưu role.
 */

exports.checkAdmin = (req, res, next) => {
  // Lấy Role từ header tạm thời để demo
  const role = req.headers["x-role"];

  if (!role) {
    return res.status(401).json({ message: "Chưa có thông tin Role!" });
  }

  if (role !== "admin") {
    return res.status(403).json({ message: "Bạn không có quyền Admin!" });
  }

  // OK thì cho qua
  next();
};
