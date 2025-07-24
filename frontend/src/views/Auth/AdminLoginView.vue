<template>
  <div class="login-background">
    <div class="login-box">
      <div class="login-left">
        <img src="../../assets/admin-login-image.jpg" class="login-image" />
      </div>

      <div class="login-right">
        <div class="login-title text-center">
          <h1>ĐĂNG NHẬP VỚI TƯ CÁCH NHÂN VIÊN</h1>
          <p>Chào mừng đến với thư viện trực tuyến</p>
          <p class="text-end mt-2">
            <router-link to="/login" class="text-decoration-none">
              Bạn là độc giả?
            </router-link>
          </p>
        </div>
        <div class="login-input">
          <label for="username">Mã nhân viên</label>
          <input
            type="text"
            v-model="MSNV"
            class="form-control"
            placeholder="Nhập mã nhân viên"
            required
          />
        </div>
        <div class="login-input">
          <label for="password">Mật khẩu</label>
          <input
            type="password"
            v-model="MatKhau"
            class="form-control"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            v-model="rememberMe"
            class="form-check-input"
          />
          <label for="rememberMe" class="form-check-label">Ghi nhớ tôi</label>
        </div>
        <button type="button" class="btn btn-primary w-100" @click="loginAdmin">
          Đăng nhập
        </button>

        <p class="text-end mt-2">
          <a href="#" class="text-decoration-none">Quên mật khẩu?</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const MSNV = ref("");
const MatKhau = ref("");
const rememberMe = ref(false);
const error = ref("");
const router = useRouter();

const loginAdmin = async () => {
  try {
    const res = await axios.post("http://localhost:3000/api/nhanvien/login", {
      MSNV: MSNV.value,
      MatKhau: MatKhau.value,
    });

    console.log(res.data);
    router.push("/admin/home");
  } catch (err) {
    if (err.response) {
      error.value = err.response.data.message;
    } else {
      error.value = "Lỗi không xác định!";
    }
  }
};
</script>

<style>
.login-background {
  height: 100vh;
  background: linear-gradient(
    135deg,
    rgb(92, 222, 255) 25%,
    rgb(41, 143, 238) 60%,
    rgb(255, 255, 255) 15%
  );
  display: flex;
  font-family: "Segoe UI", sans-serif;
  justify-content: center;
  align-items: center;
}

.login-box {
  display: flex;
  width: 1200px;
  height: 600px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
}

.login-left {
  flex: 1;
  max-width: 60%;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.login-image {
  width: 100%;
  object-fit: contain;
}

.login-right {
  flex: 1;
  max-width: 40%;
  padding: 40px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
}

.login-title h1 {
  margin-top: 30px;
  font-size: 1.6rem;
  font-weight: bold;
}

.login-title .p {
  font-weight: 300;
  font-size: 1rem;
}

.login-input {
  position: relative;
  margin-top: 15px;
  font-size: large;
  font-weight: 500;
}

.form-check {
  margin-top: 10px;
}

.btn {
  margin-top: 30px;
  font-size: larger;
  font-weight: 500;
}
</style>
