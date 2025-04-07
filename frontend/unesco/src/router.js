import { createRouter, createWebHistory } from "vue-router";
import home from "./components/home.vue";
import search from "./components/search.vue";
import about from "./components/about.vue";

const routes = [
  { path: "/", component: home },
  { path: "/about", component: about },
  {
    path: "/search",
    component: search,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
