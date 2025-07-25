import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import pinia from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";

createApp(App).use(router).mount("#app");
