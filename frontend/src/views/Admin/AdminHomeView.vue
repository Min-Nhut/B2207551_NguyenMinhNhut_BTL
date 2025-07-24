<template>
  <div class="home-container">
    <Sidebar
      :user-name="'NGUYEN VAN A'"
      :user-role="'Admin'"
      @menu-click="handleMenuClick"
    />
    <div class="main-content">
      <div class="search-div">
        Search Div
        <div class="time">{{ currentTime }}</div>
      </div>
      <div class="content-div" :class="{ 'fade-in': selectedMenu }">
        <SearchComponent v-if="selectedMenu === 'search'" />
        <div v-if="selectedMenu === 'trang chủ'">
          <h2>Trang chủ</h2>
          <p>Chào mừng đến với trang chủ!</p>
          <button @click="showAlert">Nhấn để kiểm tra</button>
        </div>
        <div v-if="selectedMenu === 'books'">
          <h2>Sách</h2>
          <p>Danh sách sách:</p>
          <ul>
            <li v-for="book in books" :key="book.id">{{ book.title }}</li>
          </ul>
        </div>
        <div v-if="selectedMenu === 'checklist'">
          <h2>Checklist</h2>
          <p>Danh sách công việc:</p>
          <ul>
            <li>Hoàn thành báo cáo</li>
            <li>Kiểm tra dữ liệu</li>
          </ul>
        </div>
        <div v-if="selectedMenu === 'statistical'">
          <h2>Statistical</h2>
          <p>Thống kê sẽ hiển thị ở đây.</p>
        </div>
        <div v-if="selectedMenu === 'document'">
          <h2>Document</h2>
          <p>Tài liệu sẽ hiển thị ở đây.</p>
        </div>
        <div v-if="selectedMenu === 'setting'">
          <h2>Setting</h2>
          <p>Cài đặt sẽ hiển thị ở đây.</p>
        </div>
        <div v-if="selectedMenu === 'help'">
          <h2>Help</h2>
          <p>Trợ giúp sẽ hiển thị ở đây.</p>
        </div>
        <div v-if="selectedMenu === 'signout'">
          <h2>Sign Out</h2>
          <p>
            Bạn sẽ được đăng xuất. <button @click="signOut">Xác nhận</button>
          </p>
        </div>
        <div v-if="selectedMenu === 'profile'">
          <h2>Profile</h2>
          <p>Thông tin: {{ userName }}, {{ userRole }}</p>
        </div>
        <div v-if="!selectedMenu">
          <h2>Chọn một mục</h2>
          <p>Vui lòng chọn một mục từ menu để xem nội dung.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Sidebar from "../../components/Sidebar.vue";
import SearchComponent from "../../components/InputSearch.vue";

export default defineComponent({
  name: "Home",
  components: {
    Sidebar,
    SearchComponent,
  },
  data() {
    return {
      selectedMenu: null,
      books: [
        { id: 1, title: "Sách 1" },
        { id: 2, title: "Sách 2" },
      ],
    };
  },
  methods: {
    handleMenuClick(menuItem) {
      this.selectedMenu = menuItem;
    },
    updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      this.currentTime = `${displayHours}:${minutes} ${period} +07`;
    },
    showAlert() {
      alert("Chức năng kiểm tra!");
    },
    signOut() {
      alert("Đăng xuất thành công!");
      this.selectedMenu = null;
    },
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
});
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.search-div {
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 5px;
}

.content-div {
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 5px;
  transition: opacity 0.3s ease;
}

.fade-in {
  opacity: 1;
}

.content-div:not(.fade-in) {
  opacity: 0.7;
}

.time {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
</style>
