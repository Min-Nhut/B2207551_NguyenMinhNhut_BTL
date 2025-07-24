<template>
  <div class="login-background">
    <div class="login-box">
      <div class="login-left">
        <img src="../../assets/login-img.jpg" class="login-image" />
      </div>

      <div class="login-right">
        <div class="login-title text-center">
          <h1>ĐĂNG NHẬP</h1>
          <p>Chào mừng đến với thư viện trực tuyến</p>
          <p class="text-end mt-2">
            <router-link to="/admin/login" class="text-decoration-none">
              Bạn là nhân viên?
            </router-link>
          </p>
        </div>

        <!-- ✅ THÔNG BÁO LỖI -->
        <p v-if="error" class="text-danger text-center my-2">{{ error }}</p>

        <div class="login-input">
          <label for="username">Tài Khoản</label>
          <input
            type="text"
            v-model="taiKhoan"
            class="form-control"
            placeholder="Nhập tài khoản"
            required
          />
        </div>

        <div class="login-input">
          <label for="password">Mật khẩu</label>
          <input
            type="password"
            v-model="matKhau"
            class="form-control"
            placeholder="Nhập mật khẩu"
            required
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

        <button type="submit" class="btn btn-primary w-100" @click="login">
          Đăng nhập
        </button>

        <p class="text-end mt-2">
          <a href="#" class="text-decoration-none">Quên mật khẩu?</a>
        </p>

        <p class="text-center mt-6 rigister">
          Chưa có tài khoản?
          <router-link to="/register" class="text-decoration-none fw-bold">
            Đăng ký ngay
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const taiKhoan = ref("");
const matKhau = ref("");
const rememberMe = ref(false);
const error = ref("");
const router = useRouter();

const login = async () => {
  error.value = "";

  if (!taiKhoan.value.trim() || !matKhau.value.trim()) {
    error.value = "Vui lòng nhập đầy đủ tài khoản và mật khẩu!";
    return;
  }

  try {
    const res = await axios.post("http://localhost:3000/api/docgia/login", {
      TaiKhoan: taiKhoan.value,
      MatKhau: matKhau.value,
    });

    console.log(res.data);

    // Có thể lưu thông tin hoặc token nếu cần
    if (rememberMe.value) {
      localStorage.setItem("docGia", JSON.stringify(res.data.docGia));
    }

    router.push("/home");
  } catch (err) {
    if (err.response) {
      error.value = err.response.data.error || "Sai thông tin đăng nhập!";
    } else {
      error.value = "Không thể kết nối máy chủ!";
    }
  }
};
</script>

<style>
.login-background {
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
  font-size: 3rem;
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

.rigister {
  margin-top: 40px;
}
</style>
