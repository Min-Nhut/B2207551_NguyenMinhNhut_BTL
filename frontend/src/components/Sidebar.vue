<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <img src="../assets/Logo.png" alt="Library Logo" />
      </div>
    </div>
    <nav class="sidebar-nav">
      <h3 class="nav-section">MAIN MENU</h3>
      <ul class="nav-list">
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ active: selectedMenu === item.label.toLowerCase() }"
          @click="$emit('menu-click', item.label.toLowerCase())"
          :title="item.tooltip"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </li>
      </ul>
      <h3 class="nav-section">SUPPORT</h3>
      <ul class="nav-list">
        <li
          v-for="(item, index) in supportItems"
          :key="index"
          :class="{ active: selectedMenu === item.label.toLowerCase() }"
          @click="$emit('menu-click', item.label.toLowerCase())"
          :title="item.tooltip"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <div
        class="user-info"
        @click="$emit('menu-click', 'profile')"
        title="Xem hồ sơ cá nhân"
      >
        <span class="user-circle">{{ userName.charAt(0) }}</span>
        <div class="user-details">
          <p>{{ userName }}</p>
          <p>{{ userRole }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    userName: {
      type: String,
      default: "NGUYEN VAN A",
    },
    userRole: {
      type: String,
      default: "Admin",
    },
    selectedMenu: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      menuItems: [
        {
          label: "Trang chủ",
          icon: "fas fa-home",
          tooltip: "Trang chính của hệ thống",
        },
        {
          label: "Search",
          icon: "fas fa-search",
          tooltip: "Tìm kiếm tài liệu",
        },
        {
          label: "Books",
          icon: "fas fa-book",
          tooltip: "Quản lý sách",
        },
        {
          label: "Checklist",
          icon: "fas fa-check-square",
          tooltip: "Danh sách công việc",
        },
        {
          label: "Statistical",
          icon: "fas fa-chart-bar",
          tooltip: "Thống kê tổng quan",
        },
        {
          label: "Document",
          icon: "fas fa-file",
          tooltip: "Quản lý tài liệu",
        },
      ],
      supportItems: [
        {
          label: "Setting",
          icon: "fas fa-cog",
          tooltip: "Cấu hình hệ thống",
        },
        {
          label: "Help",
          icon: "fas fa-question",
          tooltip: "Trợ giúp và hỗ trợ",
        },
        {
          label: "Sign Out",
          icon: "fas fa-sign-out-alt",
          tooltip: "Đăng xuất tài khoản",
        },
      ],
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

.sidebar-header {
  padding: 20px 15px;
  text-align: center;
}

.logo img {
  max-width: 140px;
  height: auto;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.05);
}

.time-display {
  font-size: 13px;
  color: #444;
  margin-top: 10px;
  font-weight: 500;
}

.sidebar-nav {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px 0;
}

.nav-section {
  color: #555;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 15px 20px 5px;
  letter-spacing: 1.2px;
  border-bottom: 1px solid #eee;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border-left: 4px solid transparent;
}

.nav-list li span {
  margin-left: 15px;
  font-size: 14px;
}

.nav-list li:hover {
  background-color: #f0f0f0;
  color: #0056b3;
  border-left-color: #0056b3;
}

.nav-list li.active {
  background-color: #007bff;
  color: #fff;
  border-left-color: #fff;
}

.nav-list li.active i {
  color: #fff;
}

.nav-list i {
  font-size: 16px;
  color: #666;
  transition: color 0.3s ease;
}

.sidebar-footer {
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  background-color: #f5f5f5;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #333;
}

.user-info:hover {
  background-color: #d3d8de;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-circle {
  width: 36px;
  height: 36px;
  background-color: #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-right: 15px;
  transition: background-color 0.3s ease;
}

.user-info:hover .user-circle {
  background-color: #0056b3;
}

.user-details p {
  margin: 0;
  font-size: 14px;
}

.user-details p:first-child {
  font-weight: 600;
  color: #222;
}

.user-details p:last-child {
  color: #666;
  font-size: 12px;
}
</style>
