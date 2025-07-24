<template>
  <div class="register-background">
    <div class="register-box">
      <div class="register-left">
        <img src="../../assets//register-image.jpg" class="register-image" />
      </div>

      <div class="register-right">
        <form @submit.prevent="submitForm">
          <div class="register-title text-center">
            <h1>ĐĂNG KÝ</h1>
            <p>Tham gia thư viện trực tuyến của chúng tôi</p>
          </div>
          <div class="register-input fullname">
            <div class="input-group">
              <label>Họ lót</label>
              <input
                v-model="hoLot"
                type="text"
                placeholder="Nhập họ lót"
                class="form-control"
              />
            </div>
            <div class="input-group">
              <label>Tên</label>
              <input
                v-model="ten"
                type="text"
                placeholder="Nhập tên"
                class="form-control"
              />
            </div>
          </div>
          <div class="register-input">
            <label for="email">Tài khoản</label>
            <input
              type="email"
              v-model="taiKhoan"
              class="form-control"
              placeholder="Nhập tài khoản"
              required
            />
          </div>
          <div class="register-input">
            <label for="phone">Số Điện Thoại</label>
            <input
              type="tel"
              v-model="dienThoai"
              class="form-control"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>
          <div class="register-input">
            <label for="password">Mật Khẩu</label>
            <input
              type="password"
              v-model="matKhau"
              class="form-control"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <div class="register-input">
            <label for="confirmPassword">Xác Nhận Mật Khẩu</label>
            <input
              type="password"
              v-model="xacNhanMK"
              class="form-control"
              placeholder="Xác nhận mật khẩu"
              required
            />
          </div>
          <div class="register-input">
            <label>Ngày sinh</label>
            <input v-model="ngaySinh" type="date" class="form-control" />

            <label>Giới tính</label>
            <select
              v-model="phai"
              class="form-select"
              placeholder="Chọn giới tính"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div class="register-input">
            <label>Địa chỉ</label>
            <input
              v-model="diaChi"
              type="text"
              placeholder="Địa chỉ"
              class="form-control"
            />
          </div>
          <p v-if="success" class="text-success text-center my-2">
            {{ success }}
          </p>
          <p v-if="error" class="text-danger text-center my-2">{{ error }}</p>
          <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
        </form>
        <p class="text-center mt-6 rigister">
          Đã có tài khoản?
          <router-link to="/login" class="text-decoration-none fw-bold">
            Đăng nhập ngay
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const hoLot = ref("");
const ten = ref("");
const ngaySinh = ref("");
const phai = ref("");
const diaChi = ref("");
const dienThoai = ref("");
const taiKhoan = ref("");
const matKhau = ref("");
const xacNhanMK = ref("");
const error = ref("");
const success = ref(""); // ✅ Thêm biến thông báo thành công

const submitForm = async () => {
  error.value = "";
  success.value = "";

  if (!hoLot.value.trim()) {
    error.value = "Họ lót không được để trống!";
    return;
  }
  if (!ten.value.trim()) {
    error.value = "Tên không được để trống!";
    return;
  }
  if (!ngaySinh.value) {
    error.value = "Vui lòng chọn ngày sinh!";
    return;
  }
  if (!phai.value) {
    error.value = "Vui lòng chọn giới tính!";
    return;
  }
  if (!diaChi.value.trim()) {
    error.value = "Địa chỉ không được để trống!";
    return;
  }
  if (!dienThoai.value.trim()) {
    error.value = "Số điện thoại không được để trống!";
    return;
  }
  if (!taiKhoan.value.trim()) {
    error.value = "Tài khoản (email) không được để trống!";
    return;
  }
  if (!matKhau.value.trim()) {
    error.value = "Mật khẩu không được để trống!";
    return;
  }
  if (!xacNhanMK.value.trim()) {
    error.value = "Xác nhận mật khẩu không được để trống!";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(taiKhoan.value)) {
    error.value = "Email không hợp lệ!";
    return;
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(dienThoai.value)) {
    error.value = "Số điện thoại phải là 10 chữ số!";
    return;
  }

  if (matKhau.value !== xacNhanMK.value) {
    error.value = "Mật khẩu xác nhận không khớp!";
    return;
  }

  try {
    await axios.post("http://localhost:3000/api/docgia/register", {
      HoLot: hoLot.value,
      Ten: ten.value,
      NgaySinh: ngaySinh.value,
      Phai: phai.value,
      DiaChi: diaChi.value,
      DienThoai: dienThoai.value,
      TaiKhoan: taiKhoan.value,
      MatKhau: matKhau.value,
    });

    success.value = "Đăng ký thành công! Vui lòng đăng nhập.";
    error.value = "";

    // Clear form
    hoLot.value = "";
    ten.value = "";
    ngaySinh.value = "";
    phai.value = "";
    diaChi.value = "";
    dienThoai.value = "";
    taiKhoan.value = "";
    matKhau.value = "";
    xacNhanMK.value = "";
  } catch (err) {
    success.value = "";
    if (err.response) {
      error.value = err.response.data.message || "Đăng ký thất bại!";
    } else {
      error.value = "Không thể kết nối máy chủ!";
    }
  }
};
</script>

<style>
.register-background {
  height: 100vh;
  background: linear-gradient(
    135deg,
    rgb(135, 205, 255) 25%,
    rgb(41, 143, 238) 60%
  );
  display: flex;
  font-family: "Segoe UI", sans-serif;
  justify-content: center;
  align-items: center;
}

.register-box {
  display: flex;
  width: 1200px;
  height: 900px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
}

.register-left {
  flex: 1;
  max-width: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.register-image {
  width: 100%;
  object-fit: contain;
}

.register-right {
  flex: 1;
  max-width: 50%;
  padding: 40px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
}

.register-title h1 {
  font-size: 2rem;
  font-weight: bold;
}

.register-title p {
  font-weight: 300;
  font-size: 1rem;
}

.register-input {
  position: relative;
  margin-top: 15px;
  font-size: large;
  font-weight: 500;
}

.fullname {
  display: flex;
  gap: 10px;
}

.input-group {
  display: block;
  flex: 1;
}

.input-group label {
  display: block;
  margin-right: 5px;
  margin-top: 5px;
}

.form-control {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 100%;
}

.btn {
  margin-top: 30px;
  font-size: larger;
  font-weight: 500;
}

.rigister {
  margin-top: 10px;
}
</style>
