import { createRouter, createWebHistory } from "vue-router";

//Auth Import
import LoginView from "../views/Auth/LoginView.vue";
import RegisterView from "../views/Auth/RegisterView.vue";
import AdminLoginView from "../views/Auth/AdminLoginView.vue";

//User Import
import HomeView from "../views/Users/HomeView.vue";

//Admin Import
import AdminHomeView from "../views/Admin/AdminHomeView.vue";

const routes = [
  //Auth
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/admin/login", component: AdminLoginView },

  // Admin
  { path: "/admin/home", component: AdminHomeView },
  // User
  { path: "/home", component: HomeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
